import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ServicePageTemplate = lazy(() => import("./pages/ServicePageTemplate"));
const DeviceDetailPage = lazy(() => import("./pages/DeviceDetailPage"));
const SolutionDetailPage = lazy(() => import("./pages/SolutionDetailPage"));
const DoctorDetailPage = lazy(() => import("./pages/DoctorDetailPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const pageFallback = (
  <div className="min-h-screen" role="status" aria-live="polite" />
);

export default function App() {
  return (
    <Suspense fallback={pageFallback}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route
            path="services/dermatology"
            element={<ServicePageTemplate slug="dermatology" />}
          />
          <Route
            path="services/laser"
            element={<ServicePageTemplate slug="laser" />}
          />
          <Route
            path="services/plastic-surgery"
            element={<ServicePageTemplate slug="plastic-surgery" />}
          />
          <Route
            path="services/hair"
            element={<ServicePageTemplate slug="hair" />}
          />
          <Route
            path="services/injectables"
            element={<ServicePageTemplate slug="injectables" />}
          />
          <Route path="technology" element={<TechnologyPage />} />
          <Route
            path="technology/:deviceSlug"
            element={<DeviceDetailPage />}
          />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route
            path="solutions/:solutionSlug"
            element={<SolutionDetailPage />}
          />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route
            path="doctors/:doctorSlug"
            element={<DoctorDetailPage />}
          />
          <Route path="booking" element={<BookingPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:articleSlug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
