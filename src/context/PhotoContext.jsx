import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { images, gallery } from '../data/media.js';
import { Lightbox } from '../components/Lightbox.jsx';

/**
 * Every photo on the page opens the same viewer, so visitors can browse all
 * photographs with Previous / Next without any photo being repeated on the page.
 * Order follows the page.
 */
const ALL_PHOTOS = [
  { ...images.coupleWedding, caption: 'Sushant & Jigyasa' },
  { ...images.groom, caption: 'Sushant' },
  { ...images.bride, caption: 'Jigyasa' },
  { ...images.lakeWatercolor, caption: 'परिणय — two hearts, one journey' },
  { ...images.sofaToon, caption: 'Our beginning' },
  ...gallery,
];

const PhotoCtx = createContext(null);

export function PhotoProvider({ children }) {
  const [index, setIndex] = useState(null);
  const openPhoto = useCallback((image) => {
    const i = ALL_PHOTOS.findIndex((p) => p.src === image.src);
    setIndex(i >= 0 ? i : 0);
  }, []);
  const value = useMemo(() => ({ openPhoto }), [openPhoto]);
  return (
    <PhotoCtx.Provider value={value}>
      {children}
      {index !== null && (
        <Lightbox items={ALL_PHOTOS} index={index} onIndex={setIndex} onClose={() => setIndex(null)} label="Photographs" />
      )}
    </PhotoCtx.Provider>
  );
}

export const usePhotos = () => useContext(PhotoCtx);
