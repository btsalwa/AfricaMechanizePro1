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
import About from "./pages/About";
import Contact from "./pages/Contact";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/not-found";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import WebinarDetail from "./pages/WebinarDetail";
import Webinars from "./pages/Webinars";
import WebinarPresentations from "./pages/WebinarPresentations";
import FarmPower from "./pages/framework/FarmPower";
import InnovativeFinancing from "./pages/framework/InnovativeFinancing";
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
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/news" component={NewsPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify-email" component={EmailVerification} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/webinars" component={Webinars} />
          <Route path="/webinars/presentations" component={WebinarPresentations} />
          <Route path="/webinars/:slug" component={WebinarDetail} />
          <Route path="/framework/farm-power" component={FarmPower} />
          <Route path="/framework/innovative-financing" component={InnovativeFinancing} />
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
