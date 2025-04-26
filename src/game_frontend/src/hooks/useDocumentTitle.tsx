import { useEffect, useRef } from 'react';
/**
 * @description The useDocumentTitle hook is useful for Setting Document Titles for pages
 * @param {String} title - props
 * @example 
 * const Page=()=>{
 *  useDocumentTitle('Page')
 *  return <WholePage/>
 * }
 */
function useDocumentTitle(title: string) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = defaultTitle.current;
    };
  }, [title]);
}

export default useDocumentTitle;