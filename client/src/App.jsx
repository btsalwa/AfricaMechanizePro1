import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./contexts/AppContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Suspense, lazy } from "react";

// Lazy-loaded page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Framework = lazy(() => import("./pages/Framework"));
const Events = lazy(() => import("./pages/Events"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const News = lazy(() => import("./pages/News"));
const NotFound = lazy(() => import("./pages/not-found"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmailPage = lazy(() => import("./hooks/VerifyEmailPage"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const WebinarDetail = lazy(() => import("./pages/WebinarDetail"));
const Webinars = lazy(() => import("./pages/Webinars"));
const WebinarPresentations = lazy(() => import("./pages/WebinarPresentations"));
const FarmPower = lazy(() => import("./pages/framework/FarmPower"));
const InnovativeFinancing = lazy(() => import("./pages/framework/InnovativeFinancing"));
const SustainableSystems = lazy(() => import("./pages/framework/SustainableSystems"));
const SocialSustainability = lazy(() => import("./pages/framework/SocialSustainability"));
const Mechanization = lazy(() => import("./pages/framework/Mechanization"));
const HumanResources = lazy(() => import("./pages/framework/HumanResources"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminResetPassword = lazy(() => import("./pages/admin/AdminResetPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const LegacyContent = lazy(() => import("./pages/LegacyContent"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Switch>
          <Route path="/" component={Home} />
          <Route path="/framework" component={Framework} />
          <Route path="/events" component={Events} />
          <Route path="/resources" component={Resources} />
          <Route path="/resources/:id" component={ResourceDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/news" component={News} />
          <Route path="/news/:slug" component={NewsDetail} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/verify-email" component={EmailVerification} /> */}
          <Route path="/verify-email" component={VerifyEmailPage} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/webinars" component={Webinars} />
          <Route
            path="/webinars/presentations"
            component={WebinarPresentations}
          />
          <Route path="/webinars/:slug" component={WebinarDetail} />
          <Route path="/framework/farm-power" component={FarmPower} />
          <Route
            path="/framework/innovative-financing"
            component={InnovativeFinancing}
          />
          <Route
            path="/framework/sustainable-systems"
            component={SustainableSystems}
          />
          <Route path="/framework/mechanization" component={Mechanization} />
          <Route
            path="/framework/social-sustainability"
            component={SocialSustainability}
          />
          <Route path="/framework/human-resources" component={HumanResources} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/reset-password" component={AdminResetPassword} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/legacy-content" component={LegacyContent} />
          <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
