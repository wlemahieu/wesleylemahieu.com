import Link from 'next/link';

const samples = [
  {
    title: 'Creating testing spies for nested modules in Express using Mocha & Chai',
    url: 'https://codesandbox.io/p/sandbox/express-mocha-chai-sinon-spies-esm-sv3kvm',
    description: 'Mock and spy nested indirect modules',
    technologies: ['Express', 'Mocha', 'Chai', 'Sinon'],
  },
  {
    title: 'API calls in Next.js using Server and Client Components',
    url: 'https://codesandbox.io/p/sandbox/next-js-13-test-server-client-api-calls-rphh17?file=%252Fapp%252FServerFetch.tsx',
    description: 'See how Next.js allows for API calls from Server or Client components.',
    technologies: ['Next.js', 'React 18'],
  },
  {
    title: 'Uploading images using Express & Multer',
    url: 'https://codesandbox.io/p/sandbox/react-express-multer--image-upload-qjzbsc?file=%2Findex.js',
    description: 'Uploading images through some "other" middleware using Expres and Multer with React.',
    technologies: ['React 18', 'Node.js', 'Express', 'Multer'],
  },
  {
    title: 'Creating private routes in React Router V6',
    url: 'https://codesandbox.io/p/sandbox/typescript-react18-2-private-route-bw2cke',
    description: 'Limit route visibility using a private route strategy in V6 React Router.',
    technologies: ['React 18', 'React Router V6'],
  },
  {
    title: 'Avoiding uncontrolled component re-renders in React',
    url: 'https://codesandbox.io/p/sandbox/react18-avoid-re-renders-usecontext-usememo-usecallback-memo-icvpz6',
    description: 'Example of useful React tools to control component renders when parent components change.',
    technologies: ['React 18'],
  },
  {
    title: 'Detecting visibility using Intersection Observer',
    url: 'https://codesandbox.io/p/sandbox/react-18-2-detect-visible-screen-element-10e7cr',
    description: 'An example of how to detect when a component is visible on the screen or not.',
    technologies: ['React 18'],
  },
  {
    title: 'React Node Websockets Chat',
    url: 'https://codesandbox.io/p/sandbox/simple-chat-react17-websockets-express-q3x118',
    description: 'A simple demonstration of chat functionality using Websockets.',
    technologies: ['React 17', 'Websockets', 'Node.js', 'Express'],
  },
  {
    title: 'Queued Material-UI Snackbar Notifications',
    url: 'https://codesandbox.io/p/sandbox/react18-mui5-queued-snackbar-messages-k9v6rw',
    description: 'Queueable notification messages using Material-UI components.',
    technologies: ['React 18', 'Material-UI V5'],
  },
  {
    title: 'React image import differences',
    url: 'https://codesandbox.io/p/sandbox/react18-2-importing-images-optj6l?file=%252Fsrc%252FApp.js',
    description: 'Show the differences in image imports in React as it relates to relative and absolute paths.',
    technologies: ['React 18'],
  },
  {
    title: 'React Axios Interceptor response vs non-response',
    url: 'https://codesandbox.io/p/sandbox/react18-express-axios-interceptor-handling-status-codes-ktnfxu?file=%2Fclient%2Fsrc%2FuseAxiosInterceptor.js',
    description: 'Using Axios interceptor to differentiate between no-response API requests and response.',
    technologies: ['React 18', 'Node.js', 'Express', 'Axios'],
  },
];

export default function Sandboxes() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">My Sandboxes</h1>
      <div className="container mx-auto max-w-screen-sm">
        <br />
        <div className={`gradient-box-1 mt-12`}>
          <p className="text-base text-base3 m-4">
            Below are a variety of code sandboxes I've put together to help others with their issues and for me to learn
            from.
          </p>
        </div>
        <div className="mt-12 text-base2 pb-1">
          {samples.map((sandbox, key) => {
            return (
              <div key={`exp-${key}`} className="mt-6 pb-6 border-b">
                <h1 className="text-2xl font-bold text-base1">
                  <Link href={sandbox.url} target="_blank">
                    {sandbox.title}
                  </Link>
                </h1>
                <p className="text-sm text-base3 max-w-screen-sm mr-12 ml-12 pt-2 pr-4 pl-4">{sandbox.description}</p>
                <ul>
                  {sandbox.technologies.map((tech, key) => (
                    <li key={`tech-${key}`}>{tech}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
