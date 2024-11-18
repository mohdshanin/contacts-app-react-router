import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ProductsList.module.css';

export default function ProductsList() {
  const [items, setItems] = useState([]); // Products list
  const [skip, setSkip] = useState(0); // Tracks how many products have been fetched
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [hasMore, setHasMore] = useState(true); // Tracks if there are more products to load

  const isLoadingRef = useRef(false);
  const listRef = useRef(null); // Reference to the scrollable list

  const URL = 'https://dummyjson.com/products';

  const getData = async (newSkip) => {
    const response = await fetch(`${URL}/?limit=10&skip=${newSkip}`);
    const data = await response.json();
    const { products = [] } = data || {};
    return products || [];
  };

  // Fetch products from the API
  const fetchProducts = useCallback(
    async (currentSkip) => {
      if (isLoadingRef.current || !hasMore) return; // Prevent fetching if already loading

      setIsLoading((prev) => !prev); // Start loading state
      isLoadingRef.current = true;

      try {
        const products = await getData(currentSkip);

        if (products.length === 0) {
          setHasMore(false); // No more products to load
        } else {
          if (skip === 0) {
            setItems(products);
          } else {
            setItems((prevItems) => [...prevItems, ...products]); // Append new products
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading((prev) => !prev); // End loading state
        isLoadingRef.current = false;
      }
    },
    [skip, hasMore]
  );

  // Scroll event handler to detect when we need to load more products
  const handleScroll = useCallback(() => {
    const list = listRef.current;
    if (
      list.scrollTop + list.clientHeight + 1 >= list.scrollHeight &&
      hasMore
    ) {
      setSkip((prevSkip) => prevSkip + 10); // Increment skip for the next batch
    }
  }, [hasMore]);

  useEffect(() => {
    fetchProducts(skip); // Fetch products whenever `skip` changes
  }, [skip, fetchProducts]);

  useEffect(() => {
    const list = listRef.current;
    list.addEventListener('scroll', handleScroll);

    return () => {
      list.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, handleScroll]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div ref={listRef} className={styles.wrapper}>
          {isLoading && (
            <div className={styles.loading}>
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWtrOWxsOTVpNHNwZG5mejk1ZTF6NnR6djV5Z2U5Y2Q2NW1qa2g2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZO9b1ntYVJmjZlsWlm/giphy.webp"
                alt="Loading..."
                width="100px"
              />
            </div>
          )}
          {items.map(({ title, price, brand, images }, index) => (
            <div key={`${title}-${index}`} className={styles.product}>
              <img src={images[0]} alt={title} width="100px" />
              <div>
                <p>{title}</p>
                <p>Price: ${price}</p>
                <p>Brand: {brand}</p>
              </div>
            </div>
          ))}
          {!hasMore && (
            <p className={styles.noMoreMessage}>No more products to load.</p>
          )}
        </div>
      </div>
    </div>
  );
}
