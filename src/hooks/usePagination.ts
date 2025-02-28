import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationReturn {
    currentPage: number,
    totalPages: number,
    setTotalPages: (TotalPages: number) => void,
    handleNextPage: () => void,
    handlePrevPage: () => void,
    handlePageChange:(page: number) => void,
    getPageNumbers: (maxPagesToShow?: number) => number[],
}

export const usePagination = (initialPage: number = 1): PaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = parseInt(searchParams.get("page") ?? '') || initialPage;

  const [currentPage, setCurrentPage] = useState<number>(pageFromURL); // Используем значение из URL
  const [totalPages, setTotalPages] = useState<number>(0);

  // Синхронизация currentPage с URL
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  // Переход на следующую страницу
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // Переход на предыдущую страницу
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // Переход на конкретную страницу
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Рассчитываем диапазон отображаемых страниц
  const getPageNumbers = (maxPagesToShow: number = 10) => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    setTotalPages,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    getPageNumbers,
  };
};