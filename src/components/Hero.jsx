import Container from "./container/Container";
import { Button } from "./ui/button";

function Hero() {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <section className="w-full min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-4xl text-center space-y-6">
            {/* Badge */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 blur-3xl -z-10">
              🚀 DevLogs — Share Your Journey
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Document Your{" "}
              <span className="bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Developer Journey
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Write blogs, share your learnings, and build your public dev
              diary. Track your progress and inspire others.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button size="lg" onClick={() => navigate("/add-post")}>
                Start Writing
              </Button>

              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                Explore Posts
              </Button>
            </div>

            {/* Optional Code-style line */}
            <div className="mt-6 text-sm text-muted-foreground font-mono">
              <span className="text-green-500">const</span>{" "}
              <span className="text-blue-400">dev</span> ={" "}
              <span className="text-yellow-400">"keep building 🚀"</span>;
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Hero;
