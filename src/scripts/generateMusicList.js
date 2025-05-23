import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as mm from 'music-metadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MUSIC_DIR = join(process.cwd(), 'public', 'music');

async function generateMusicList() {
  const musicLibrary = {
    tracks: []
  };

  // Función para escanear recursivamente los directorios
  async function scanDirectory(dir) {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);
      
      if (stat.isDirectory()) {
        await scanDirectory(filePath);
      } else if (file.endsWith('.mp3')) {
        try {
          // Obtener metadatos del archivo MP3
          const metadata = await mm.parseFile(filePath);
          
          // Crear ruta relativa para el archivo
          const relativePath = relative(MUSIC_DIR, filePath).replace(/\\/g, '/');
          
          musicLibrary.tracks.push({
            title: metadata.common.title || file.replace('.mp3', ''),
            artist: metadata.common.artist || 'Unknown',
            genre: metadata.common.genre?.[0] || basename(dirname(filePath)),
            duration: metadata.format.duration,
            url: `/music/${relativePath}`
          });
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    }
  }

  await scanDirectory(MUSIC_DIR);

  // Guardar el JSON generado
  writeFileSync(
    join(MUSIC_DIR, 'songs.json'),
    JSON.stringify(musicLibrary, null, 2)
  );

  console.log(`Generated songs.json with ${musicLibrary.tracks.length} tracks`);
}

generateMusicList().catch(console.error); 