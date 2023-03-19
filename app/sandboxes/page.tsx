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
    <>
      <div className="header">
        <h1>Sandboxes</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Code samples</h2>
        <div>
          <div className="gradient-box-1" style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
            <p>
              Below are a variety of code sandboxes I've put together to help others with their issues on Stackoverflow
              as well as for me to better understand and learn from. This list will keep growing so be sure to check
              back every few weeks if you're interested!
            </p>
          </div>
          <div style={{ marginTop: '2rem' }}>
            {samples.map((sandbox, key) => {
              return (
                <div key={`exp-${key}`}>
                  <h3>
                    <Link href={sandbox.url} target="_blank">
                      {sandbox.title}
                    </Link>
                  </h3>
                  <p>{sandbox.description}</p>
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
    </>
  );
}
