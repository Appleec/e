/**
 * MIME类型（MIME Type，媒体类型）是用于表示文件类型的标准格式，常用于在网络上传输文件时指定文件的格式和编码方式
 *
 * https://github.com/nir11/file-type-checker/tree/main/src/core/file-types
 * https://github.com/basedwon/mimetics/blob/master/lib/definitions.js
 * https://github.com/rsdoiel/mimetype-js/blob/master/mimetype.js
 */

const fileTypes = Object.freeze([
  /**
   * Compressed
   */
  {
    extension: ['zip', 'epub'],
    mimeType: 'application/zip',
    tag: 'compressed',
    description: 'ZIP',
  },
  {
    extension: '7z',
    mimeType: 'application/x-7z-compressed',
    tag: 'compressed',
    description: '7-Zip compressed file.',
  },
  {
    extension: 'rar',
    mimeType: 'application/x-rar-compressed',
    tag: 'compressed',
    description: 'RAR',
  },
  {
    extension: 'gz',
    mimeType: 'application/gzip',
    tag: 'compressed',
    description: 'GZIP',
  },
  {
    extension: 'lzh',
    mimeType: 'application/x-lzh-compressed',
    tag: 'compressed',
    description: 'Compressed file using Lempel-Ziv and Haruyasu (LZH) compression algorithm',
  },

  /**
   * Video
   */
  {
    extension: 'swf',
    mimeType: 'application/x-shockwave-flash',
    tag: 'video',
    description: 'SWF (Shockwave Flash) is a file format for multimedia, vector graphics, and ActionScript, used for creating and delivering animations, games, and other interactive web-based content',
  },
  {
    extension: 'm4v',
    mimeType: 'video/x-m4v',
    tag: 'video',
    description: "Apple's video container format, very similar to MP4",
  },
  {
    extension: 'mov',
    mimeType: 'video/quicktime',
    tag: 'video',
    description: 'QuickTime movie file',
  },
  {
    extension: 'mkv',
    mimeType: 'video/x-matroska',
    tag: 'video',
    description: 'MKV (Matroska Video) is a flexible, open-source media container format that supports multiple audio, video, and subtitle streams in a single file',
  },
  {
    extension: 'flv',
    mimeType: 'video/x-flv',
    tag: 'video',
    description: '',
  },
  {
    extension: 'avi',
    mimeType: 'video/x-msvideo',
    tag: 'video',
    description: 'AVI video',
  },
  {
    extension: 'webm',
    mimeType: 'video/webm',
    tag: 'video',
    description: 'WebM is a royalty-free, open-source media file format optimized for web delivery, using efficient VP8 video and Vorbis audio codecs',
  },
  {
    extension: ['mpeg', 'mpg'],
    mimeType: 'video/mpeg',
    tag: 'video',
    description: '',
  },
  {
    extension: 'ogv',
    mimeType: 'video/ogg',
    tag: 'video',
    description: 'Ogg Vorbis Codec compressed Multimedia file',
  },
  {
    extension: 'mp4',
    mimeType: 'video/mp4',
    tag: 'video',
    description: 'A multimedia container format widely used for storing audio, video, and other data, and is known for its high compression efficiency and compatibility with many devices',
  },

  /**
   * Audio
   */
  {
    extension: 'm4a',
    mimeType: 'audio/x-m4a',
    tag: 'audio',
    description: 'Apple Lossless Audio Codec file.',
  },
  {
    extension: 'flac',
    mimeType: 'audio/x-flac',
    tag: 'audio',
    description: 'Free Lossless Audio Codec file.',
  },
  {
    extension: 'amr',
    mimeType: 'audio/amr',
    tag: 'audio',
    description: 'Adaptive Multi-Rate ACELP (Algebraic Code Excited Linear Prediction) Codec, commonly audio format with GSM cell phones.',
  },
  {
    extension: 'aac',
    mimeType: 'audio/aac',
    tag: 'audio',
    description: 'Advanced Audio Coding (AAC) is an audio coding standard for lossy digital audio compression.',
  },
  {
    extension: 'weba',
    mimeType: 'audio/webm',
    tag: 'audio',
    description: 'WebM audio files.',
  },
  {
    extension: 'wav',
    mimeType: 'audio/wav',
    tag: 'audio',
    description: 'WAV audio files.',
  },
  {
    extension: 'mp3',
    mimeType: 'audio/mpeg',
    tag: 'audio',
    description: 'MP3 audio files.',
  },
  {
    extension: ['oga', 'ogg'],
    mimeType: 'audio/ogg',
    tag: 'audio',
    description: 'OGG audio files.',
  },
  {
    extension: ['mid', 'midi'],
    mimeType: 'audio/midi',
    tag: 'audio',
    description: 'MIDI audio files.',
  },

  /**
   * Text
   */
  {
    extension: 'md',
    mimeType: 'text/markdown',
    tag: 'text',
    description: '',
  },
  {
    extension: 'rtf',
    mimeType: 'application/rtf',
    tag: 'text',
    description: 'Rich Text Format word processing file',
  },
  {
    extension: 'csv',
    mimeType: 'text/csv',
    tag: 'text',
    description: 'Comma-separated value files.',
  },
  {
    extension: 'js',
    mimeType: 'text/javascript',
    tag: 'text',
    description: 'JavaScript files.',
  },
  {
    extension: 'css',
    mimeType: 'text/css',
    tag: 'text',
    description: 'CSS Stylesheet.',
  },
  {
    extension: ['html', 'htm'],
    mimeType: 'text/html',
    tag: 'text',
    description: 'HTML files.',
  },
  {
    extension: ['txt', 'text'],
    mimeType: 'text/plain',
    tag: 'text',
    description: 'Plain text file.',
  },

  /**
   * Image
   */
  {
    extension: ['tif', 'tiff'],
    mimeType: 'image/tiff',
    tag: 'image',
    description: '',
  },
  {
    extension: 'svg',
    mimeType: 'image/svg+xml',
    tag: 'image',
    description: '',
  },
  {
    extension: 'avif',
    mimeType: 'image/avif',
    tag: 'image',
    description: 'Alliance for Open Media (AOMedia) Video 1 (AV1) Image File.',
  },
  {
    extension: 'bmp',
    mimeType: 'image/bmp',
    tag: 'image',
    description: 'A bitmap format used mostly in Windows.',
  },
  {
    extension: 'bpg',
    mimeType: 'image/bpg',
    tag: 'image',
    description: 'Better Portable Graphics image format.',
  },
  {
    extension: 'cr2',
    mimeType: 'image/x-canon-cr2',
    tag: 'image',
    description: 'Canon digital camera RAW file.',
  },
  {
    extension: 'exr',
    mimeType: 'image/x-exr',
    tag: 'image',
    description: 'OpenEXR bitmap image format.',
  },
  {
    extension: 'gif',
    mimeType: 'image/gif',
    tag: 'image',
    description: 'Image file encoded in the Graphics Interchange Format (GIF).',
  },
  {
    extension: 'heic',
    mimeType: 'image/heic',
    tag: 'image',
    description: 'A variant of the HEIF (High Efficiency Image Format) that store images on the latest Apple devices.',
  },
  {
    extension: 'ico',
    mimeType: 'image/x-icon',
    tag: 'image',
    description: 'Computer icon encoded in ICO file format.',
  },
  {
    extension: ['jpg','jpeg'],
    mimeType: 'image/jpeg',
    tag: 'image',
    description: 'JPEG (Joint Photographic Experts Group) is a widely used lossy image compression format.',
  },
  {
    extension: 'pbm',
    mimeType: 'image/x-portable-bitmap',
    tag: 'image',
    description: 'PBM (Portable Bitmap) is a simple monochrome bitmap image format that uses plain text ASCII characters to represent binary image data.',
  },
  {
    extension: 'pgm',
    mimeType: 'image/x-portable-graymap',
    tag: 'image',
    description: 'PGM (Portable Graymap) is a simple grayscale image format that uses ASCII text characters to represent binary image data.',
  },
  {
    extension: 'png',
    mimeType: 'image/png',
    tag: 'image',
    description: 'PNG (Portable Network Graphics) is a lossless image compression format that supports a wide range of color depths and transparency and is widely used for high-quality graphics.',
  },
  {
    extension: 'ppm',
    mimeType: 'image/x-portable-pixmap',
    tag: 'image',
    description: 'PPM (Portable Pixmap) is a simple color image format in the Portable Network Graphics (PNG) suite.',
  },
  {
    extension: 'psd',
    mimeType: 'image/vnd.adobe.photoshop',
    tag: 'image',
    description: 'PSD (Photoshop Document) is an Adobe Photoshop image file format.',
  },
  {
    extension: 'webp',
    mimeType: 'image/webp',
    tag: 'image',
    description: 'A modern image format that provides superior lossless and lossy compression for images on the web.',
  },

  /**
   * Other
   */
  {
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    tag: 'other',
    description: 'Word',
  },
  {
    extension: 'doc',
    mimeType: 'application/msword',
    tag: 'other',
    description: 'Old Microsoft Word documents',
  },
  {
    extension: 'pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument',
    tag: 'other',
    description: 'PowerPoint',
  },
  {
    extension: 'ppt',
    mimeType: 'application/vnd.ms-powerpoint',
    tag: 'other',
    description: 'PowerPoint',
  },
  {
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    tag: 'other',
    description: 'Excel',
  },
  {
    extension: 'xls',
    mimeType: 'application/vnd.ms-excel',
    tag: 'other',
    description: 'Excel',
  },
  {
    extension: 'pdf',
    mimeType: 'application/pdf',
    tag: 'other',
    description: 'Portable Document Format',
  },
  {
    extension: 'xml',
    mimeType: 'application/xml',
    tag: 'other',
    description: 'XML',
  },
  {
    extension: 'json',
    mimeType: 'application/json',
    tag: 'other',
    description: 'JSON',
  },
  {
    extension: 'php',
    mimeType: 'application/x-httpd-php',
    tag: 'other',
    description: '',
  },
  {
    extension: 'js',
    mimeType: 'application/javascript',
    tag: 'other',
    description: '',
  },
  {
    extension: 'bat',
    mimeType: 'application/x-bat',
    tag: 'other',
    description: '',
  },
  {
    extension: 'h',
    mimeType: 'text/x-chdr',
    tag: 'other',
    description: '',
  },
  {
    extension: 'pem',
    mimeType: 'application/x-pem-file',
    tag: 'other',
    description: '',
  },
  {
    extension: 'r',
    mimeType: 'text/x-r-source',
    tag: 'other',
    description: '',
  },
  {
    extension: 'ini',
    mimeType: 'text/plain',
    tag: 'other',
    description: '',
  },
  {
    extension: 'conf',
    mimeType: 'text/plain',
    tag: 'other',
    description: '',
  },
  {
    extension: 'ps',
    mimeType: 'application/x-powershell',
    tag: 'other',
    description: '',
  },
  {
    extension: 'ps',
    mimeType: 'application/postscript',
    tag: 'other',
    description: 'PostScript document',
  },
  {
    extension: 'vb',
    mimeType: 'text/x-vb',
    tag: 'other',
    description: '',
  },
  {
    extension: 'cs',
    mimeType: 'text/x-csharp',
    tag: 'other',
    description: '',
  },
  {
    extension: 'cpp',
    mimeType: 'text/x-c++src',
    tag: 'other',
    description: '',
  },
  {
    extension: 'c',
    mimeType: 'text/x-csrc',
    tag: 'other',
    description: '',
  },
  {
    extension: 'swift',
    mimeType: 'text/x-swift',
    tag: 'other',
    description: '',
  },
  {
    extension: 'ts',
    mimeType: 'text/x-typescript',
    tag: 'other',
    description: '',
  },
  {
    extension: 'rs',
    mimeType: 'text/x-rust',
    tag: 'other',
    description: '',
  },
  {
    extension: ['kt', 'kts'],
    mimeType: 'text/x-kotlin',
    tag: 'other',
    description: '',
  },
  {
    extension: ['yml', 'yaml'],
    mimeType: 'application/x-yaml',
    tag: 'other',
    description: '',
  },
  {
    extension: 'go',
    mimeType: 'text/x-go',
    tag: 'other',
    description: '',
  },
  {
    extension: 'sql',
    mimeType: 'application/sql',
    tag: 'other',
    description: '',
  },
  {
    extension: 'java',
    mimeType: 'text/x-java-source',
    tag: 'other',
    description: '',
  },
  {
    extension: 'py',
    mimeType: 'text/x-python',
    tag: 'other',
    description: '',
  },
  {
    extension: 'rb',
    mimeType: 'text/x-ruby',
    tag: 'other',
    description: '',
  },
  {
    extension: 'sh',
    mimeType: 'application/x-sh',
    tag: 'other',
    description: '',
  },
  {
    extension: 'sqlite',
    mimeType: 'application/x-sqlite3',
    tag: 'other',
    description: 'SQLite database file',
  },
  {
    extension: 'exe',
    mimeType: 'application/x-msdownload', // 'application/x-dosexec' is a subtype of 'application/x-msdownload', therefore it is not necessary to include it (https://web.archive.org/web/20160629113130/http://www.webarchive.org.uk/interject/types/application/x-dosexec)
    tag: 'other',
    description: 'Windows/DOS executable file and its descendants',
  },
  {
    extension: 'ttf',
    mimeType: 'application/x-font-ttf',
    tag: 'other',
    description: 'TrueType font file',
  },
]);

export default fileTypes;
