import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import { useMediaQuery } from "@mui/material";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import ProductCard from "./Home/ProductCard";
import PaginationControls from "./Home/PaginationControls";
import LoadingOverlay from "./Home/LoadingOverlay";
import SortAndFilterControls from "./Home/SortandFilterControls";
import ScrollToTopButton from "./Home/ScrolltoTop";
import noResultsImage from "../assets/Not.png";

const Home = ({ filteredProducts, loading }) => {
  const [columns, setColumns] = useState(4);
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "USD"
  );
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [showBlurLoading, setShowBlurLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(filteredProducts);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const productsPerPage = isMobile ? 10 : 9; // Ajuste para móvil o escritorio
  const location = useLocation();

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    if (location.state?.productosFiltrados) {
      setDisplayedProducts(location.state.productosFiltrados);
      setCurrentPage(1); // Reinicia la paginación si se reciben nuevos productos
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollToTop(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subcategoria = queryParams.get("subcategoria");
    const categoria = queryParams.get("categoria");

    setIsLoading(true);

    setTimeout(() => {
      let filtered;
      if (subcategoria) {
        filtered = filteredProducts.filter(
          (product) => product.subcategoria?.id.toString() === subcategoria
        );
      } else if (categoria) {
        filtered = filteredProducts.filter(
          (product) => product.categoria?.id.toString() === categoria
        );
      } else {
        filtered = filteredProducts;
      }

      setDisplayedProducts(filtered);
      setIsLoading(false);
    }, 1000);
  }, [location.search, filteredProducts]);

  const sortProducts = () => {
    if (sortOption === "low-to-high") {
      return [...displayedProducts].sort((a, b) => a.precio - b.precio);
    }
    if (sortOption === "high-to-low") {
      return [...displayedProducts].sort((a, b) => b.precio - a.precio);
    }
    if (sortOption === "newest") {
      return [...displayedProducts].sort(
        (a, b) => new Date(b.tiempo_creado) - new Date(a.tiempo_creado)
      );
    }
    return displayedProducts;
  };

  const sortedProducts = sortProducts();

  const handleCurrencyChange = (newCurrency) => {
    setShowBlurLoading(true);
    setLoadingCurrency(true);
    setTimeout(() => {
      setCurrency(newCurrency);
      localStorage.setItem("currency", newCurrency);
      setLoadingCurrency(false);
      setShowBlurLoading(false);
    }, 1500);
  };

  const convertPrice = (price) => {
    const exchangeRate = currency === "CUP" ? 320 : 1;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price * exchangeRate);
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const debouncedSort = debounce((option) => setSortOption(option), 300);

  const resetFilters = () => {
    setDisplayedProducts(filteredProducts);
    setCurrentPage(1); // Reinicia la paginación
  };

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <CircularProgress size={80} sx={{ color: "#fff" }} />
        </Box>
      )}

      <Box sx={{ marginBottom: 2.5,marginRight:"25px" }}>
        <SortAndFilterControls
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          sortOption={sortOption}
          debouncedSort={debouncedSort}
          columns={columns}
          setColumns={setColumns}
          paginatedProducts={paginatedProducts}
          displayedProducts={displayedProducts}
        />
        
        {displayedProducts.length !== filteredProducts.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 1,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={resetFilters}
              startIcon={<CleaningServicesOutlinedIcon />}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
                borderRadius: "20px",
                paddingX: 2,
              }}
            >
              Limpiar filtros
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : paginatedProducts.length > 0 ? (
          <Grid
            container
            spacing={3}
            sx={{ maxWidth: "1200px", marginX: "auto" }}
          >
            {paginatedProducts.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={columns === 3 ? 4 : 3}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  currency={currency}
                  convertPrice={convertPrice}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={noResultsImage}
              alt="Sin resultados"
              sx={{
                width: "200px",
                height: "auto",
                marginBottom: 2,
                filter: "blur(0.5px)",
                opacity: 0.7,
              }}
            />
            <Typography color="gray">
              No hay resultados que coincidan con la búsqueda.
            </Typography>
          </Box>
        )}
      </Box>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {showScrollToTop && <ScrollToTopButton onClick={scrollToTop} />}
    </Box>
  );
};

export default Home;
