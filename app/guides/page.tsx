import Link from 'next/link';

export default function Guides() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">Guides</h1>
      <div className="container mx-auto max-w-screen-sm mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-base2">Take control of your component renders!</h2>
          <sub>
            Feb 15th, 2023 - <i>By: Wesley LeMahieu</i>
          </sub>
        </div>

        <p className="p-4 text-left">
          A common problem developers face in React.js is controlling when components re-render. It may go unnoticed at
          first, however, as your application grows in complexity, any extra renders will likely become more and more
          apparent. If you have a growing user-base, that will only exacerbate the problem. Extra component renders can
          be detrimental to the user experience of your application and also have the potential for increased billing
          costs.
        </p>
        <p className="p-4 text-left">
          This guide will demonstrate a few different techniques to prevent unwanted component renders. Some of the
          built-in React tools that will be demonstrated are useCallback(), useContext(), useMemo() and memo()
          specifically as they relate to Functional components.
        </p>
        <p className="p-4 text-left">
          Follow along with a{' '}
          <Link
            className="text-base4"
            href="https://codesandbox.io/p/sandbox/react18-avoid-re-renders-usecontext-usememo-usecallback-memo-icvpz6"
            target="_blank"
          >
            sandbox demonstration
          </Link>{' '}
          of these applied strategies.
        </p>
        <p className="p-4 text-left">
          Before jumping into any code demonstrations, I’ll provide a few simplified explanations of the various tools
          and terminologies used throughout this article so there’s a baseline understanding of what’s going on.
        </p>

        <h4 className="text-xl font-bold text-base4">What is a "render"?</h4>
        <p className="p-4 text-left">
          A component render is when a component executes the entire set of code (or instructions) then returns either
          null, some DOM (aka HTML), a data object or a callback function.
        </p>

        <h4 className="text-xl font-bold text-base4">What is a "callback"?</h4>
        <p className="p-4 text-left">
          Think of a callback as a function that you plan to run later from a different component. For example, a React
          hook may be responsible for performing particular logic then returning a function (or "callback”) that will
          then be re-used in many other components.
        </p>

        <span>To be continued...</span>
      </div>
    </div>
  );
}
