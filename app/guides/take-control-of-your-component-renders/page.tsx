import Link from 'next/link';

export default function Guide1() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">Take control of your component renders!</h1>
      <sub className="m-4">
        Feb 15th, 2023 - <i>By: Wesley LeMahieu</i>
      </sub>
      <div className="container mx-auto max-w-screen-sm">
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
            className="text-base5"
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

        <h4 className="text-xl font-bold text-base4 mt-4">What is a "render"?</h4>
        <p className="p-4 text-left">
          A <b>render</b> is when a component executes it's entire set of code (or instructions) then returns either
          null, some DOM (aka HTML), a data object or a callback function.
        </p>

        <h4 className="text-xl font-bold text-base4">What is a "callback"?</h4>
        <p className="p-4 text-left">
          A <b>callback</b> is a function that's run later in the execution order generally from a separate component
          than the one that defined it. For example, a React hook may be responsible for performing particular logic
          then returning a function (or "callback”) that will then be re-used in many other components.
        </p>

        <h4 className="text-xl font-bold text-base4">What is "state"?</h4>
        <p className="p-4 text-left">
          <b>State</b> is essentially the glue the creates different view renders. It's a piece (or a "variable") of
          information that stays around when the component re-renders.
        </p>

        <h4 className="text-xl font-bold text-base4">What is "context"?</h4>
        <p className="p-4 text-left">
          <b>Context</b> allows for parental component dissemination of state (and a state setter) to any amount of sub
          components that need a piece of state or the ability to mutate state.
        </p>

        <h4 className="text-xl font-bold text-base4">What is a "memo"?</h4>
        <p className="p-4 text-left">
          <b>memo</b> is a React wrapper which let's you memoize components to ensure the that they only re-render when
          one of it's props changes from the previous render.
        </p>

        <h4 className="text-xl font-bold text-base4">What is "useMemo"?</h4>
        <p className="p-4 text-left">
          <b>useMemo</b> is similar to memo in that it allows control of rendering by creating a dependency array of
          injected variables, although it's for memozing functions instead of components. It's useful to prevent
          function results from re-rendering due to unrelated prop changes.
        </p>

        <h4 className="text-xl font-bold text-base4">How does it all make sense together?</h4>

        <p className="p-4">
          Taking a look at the{' '}
          <Link
            className="text-base5"
            href="https://codesandbox.io/p/sandbox/react18-avoid-re-renders-usecontext-usememo-usecallback-memo-icvpz6"
            target="_blank"
          >
            sandbox demonstration
          </Link>
          , you'll see a very basic app structure in place to simulate renders.
        </p>
        <p className="p-4">
          Inside <b>index.js</b> is a <i>Context Provider</i> which wraps the entire app. <b>GoodApp/index.js</b>
          contains two separate components --- <b>SubscribedToLoading.js</b> and <b>SubscribedToAccounts.js</b> which
          are each listening to different parts of context state. As such, they each expect to only render when what
          they are listening for changes and nothing else.
        </p>

        <h4 className="text-xl font-bold text-base4">How do I test this out?</h4>

        <p className="p-4">
          When you click <b>"Start"</b>, the demonstration will simulate an asynchronous API call using a hook which
          produces a changing loading state and finally a received payload of "accounts". Additionally, further renders
          can be tested by clicking the <b>"Add Acccount"</b> button. What you'll notice is the component subscribed to
          acccounts changing only renders when the <b>accounts</b> array changes, not when the <b>loading</b> state
          changes.
        </p>

        <h4 className="text-xl font-bold text-base4">What should I look for?</h4>

        <p className="p-4">
          A great example of <b>memo</b> in use to prevent unwanted renders is to look at the{' '}
          <b>SubscribedToAccounts.js</b> component. It contains a <b>AccountsConsumer</b> which selects the{' '}
          <b>accouunts</b> piece of context state. It then passes it to a memoized <b>Accounts</b> component that only
          renders when the length of the accounts array changes.
        </p>

        <p className="p-4">
          Furthermore, in this same component you'll notice a nested <b>RenderCountConsumer</b> component who's sole
          responsibility is to render the total times the <b>Accounts</b> component renders using a crude state counter.
        </p>

        <h4 className="text-xl font-bold text-base4">What's are the key takeaways?</h4>

        <p className="p-4">
          Generally speaking, a state management system like <b>Redux</b>, <b>Zustand</b> or <b>Recoil</b> would be
          better fit for the job of sharing global state between components. It's also good to get in the habit of
          memoizing your components and functions, particularly compute-intensive or asynchronous logic.
        </p>
      </div>
    </div>
  );
}
