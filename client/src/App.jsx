import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./contexts/AppContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Framework from "./pages/Framework";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NotFound from "./pages/not-found";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import EmailVerification from "./pages/EmailVerification";
import VerifyEmailPage from "./hooks/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";
import WebinarDetail from "./pages/WebinarDetail";
import Webinars from "./pages/Webinars";
import WebinarPresentations from "./pages/WebinarPresentations";
import FarmPower from "./pages/framework/FarmPower";
import InnovativeFinancing from "./pages/framework/InnovativeFinancing";
import SustainableSystems from "./pages/framework/SustainableSystems";
import SocialSustainability from "./pages/framework/SocialSustainability";
import Mechanization from "./pages/framework/Mechanization";
import HumanResources from "./pages/framework/HumanResources";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LegacyContent from "./pages/LegacyContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
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
