import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className=" py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <div>
            <a
              href="http://www.linkedin.com/in/michaël-ben-arab-3458a087"
              className="text-gray-400 hover:text-blue-600 flex items-center space-x-2"
              target="_blank"
            >
              <Linkedin className="h-6 w-6" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div>
            <a
              href="https://github.com/Merionard/my-ae-front-end"
              className="text-gray-400 hover:text-blue-600 flex items-center space-x-2"
              target="_blank"
            >
              <Github className="h-6 w-6" />
              <span>GitHub</span>
            </a>
          </div>
          <div className="flex justify-center md:justify-end lg:justify-center space-x-4">
            <Image
              src="/react-2.svg"
              alt="React"
              title="React js"
              width={40}
              height={50}
            />
            <Image
              src="/next.svg"
              alt="Next js"
              title="Next js"
              width={60}
              height={50}
            />
            <Image
              src="/prisma-2.svg"
              alt="Prisma"
              title="Prisma"
              width={60}
              height={50}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
