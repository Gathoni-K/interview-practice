# Questions on Frontend

-These are sample questions to expect in a frontend interview.

**Sample Questions**

1.How are RESTful APIs integrated in React?

-The React's useEffect hook handles API calls, lets one trigger a fetch when a component mounts or when a dependency (ID or search query ) changes.

-The fetch call lives inside the effect and its result is pushed into component state via useState which then drives what the UI renders.

-This however gets messy at scale, a custom hook or a library is the right move.

    useEffect(() => {
        fetch('/api/urlHere)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => setError(err.message));
    }, []);


2.Loading states in React.

-Model 4 distinct states in TS as a discriminated union with 4 statuses: loading, success, error, idle. This makes impossible combinations, like being simultaneously loading and errored, structurally unrepresentable and forces one to handle every case explicitly in JSX.

    type State<T> =
    | { status : 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };

    if (state.status === 'loading') return <Spinner />
    if (state.status === 'error') return <ErrorBanner message = {state.message} />
    if (state.status === 'success') return <UserList users = {state.data} />
    

3.Error handling.

-Has 2 layers, the first is network-level errors, which 'fetch' surfaces as thrown exceptions and one can catch with '.catch()'

-The second one is HTTP-level errors - 4** and 5** responses, which fetch does not throw automatically, thus one must manually check 'response.ok' and throw if it is false, ideally after reading the error body for a meaningful message. 

-An error boundary component wraps the tree to catch anything escaping into the render phase.

    //Network errors
    .catch(err => {
        if (err.name === 'AbortError') return;
        //ignores intentional cancels
        setError(err.message);
    });

    //HTTP-level errors (fetch does not throw error codes)
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Request failed: ${res.status}`);

    }

    //the above code is paired with an Error Boundary for unhandled rendering errors propagating from async operations thrown into React state.


4.Handling retries.

-Are best implemented with exponential backoff, waiting 500ms before the first retry, 1 second before the second, 2 before the third and so one.

-The critical rule is to only retry idempotent request like GET, PUT but never POST, since retrying non-idempotent request risks duplicating side effects on the server.


    async function fetchWIthRetry(url: string, retries = 3, delay = 500): Promise<Response>{
        for (let attempt = 0; attempt < retries; attempt ++){
            const res = await fetch(url);
            if (res.ok || attempt === retries -1)
            return res;

            const backoff = delay * 2 ** attempt;
            //retries after 500ms, 1s, 2s
            await new Promise(r => setTimeout(r, backoff));
        }

        throw new Error('Max tries exceeded')'
    }



5.Cancelling request

-The browser's inbuilt ABortController API handles cancellation cleanly. 

-A controller is created inside useEffect, passes its signal to fetch and returns a cleanup functions that calls 'abort()', the component unmounts or a dependency changes before the response arrives, the in-flight request is cancelled immediately, preventing stale responses from overwriting fresher data, a common source of race conditions in search inputs.

    useEffect(() => {
        const controller = new AbortController();

        fetch('api/search?q=' + query, { signal:: controller.signal })
        .then(//code here);

        return () => controller.abort();
        //fires on cleanup

    }, [query]);

    //this is critical for search inputs and rapidly changing dependencies, this prevents race conditions where a stale response overwrites a newer one.


6.Type safety.

-TS interfaces define the shape of our API responses, giving us compile-time safety throughout your components.

-For runtime safety, as TS types are erased at runtime and cannot be trusted that an external API actually returns what it promises, a library like Zod, lets one declare a schema and parses the response against it, throwing a descriptive error immediately if the shape doesn't match rather then letting bad data silently propagating into our UI.

-Zod is about data correctness, it validates the shape of the data received from the API actually matching it to what the app expects.


    import { z } from 'zod';

    const UserSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    });

    type User = z.infer<typeof UserSchema>;
    //type derived from schema

    const user = UserSchema.parse(await res.json());
    //throws if the shape is wrong


-Tanstack Query can be used to  handle the above:

    1.Fetching
    2.Loading states.
    3.Errors
    4.Retries
    4.Cancellation of requests.

-Tanstack Query is built around the concept of a query key, a unique identifier for each piece of server data.

1.Fetching - a query key and a query function is provided. Tanstack Query calls the function when the component mounts and whenever the key changes. The key changing is what triggers a fresh fetch, such that if the key includes a user ID or search term, changing that value automatically kicks off a new request without writing any effect logic.

2.Loading states - it tracks the state of every query intentionally and exposes granular flags, 'isLoading', is true on the very first fetch when there is no cached data yet. 'isFetching' is true whenever a request is in flight, including background refetches.

3.Error - if the query function throws, Tanstack Query catches it and moves the query into an error state, exposing the error object directly. It does not swallow the error or require one to wrap everything in try/catch manually in our component.

4.Retries - by default it retries failed requests 3 times before marking the qiery as errored, with exponential backoff between attempts. One can configure the retry count, the delay and a function deciding whether a particular error should be retried at all.

5.Cancellation - it creates an AbortController internally for every query and passes the signal to our query function. When a component unmounts or the query key changes before the response arrives, it aborts the in-flight request automatically.

-It also adds caching, every successful response is stored against its query key, so if user navigates away and comes back, the cached data renders instantly while a background refetch quickly checks for updates.



## Performance Optimization.

1.Code splitting and lazy loading.

-Rather than shipping one giant budnle, split the app at the route level using React.lazy and Suspense, so users only download the code for the page they are actually on.

2.Memorization with intent.

-useMemo and useCallback used selectively. The common mistake is over-memoizing, which adds overhead without benefit. They are only reached for when a component is provably re-rendering unnecessarily, confirmed through React DevTools profiler.

3.Virtualization for long lists.

-Rendering thousands of DOM Nodes destroys performance, for any list that could grow large, transaction histories, search results, data tables, TanStack Virtual to render only the rows currently in the viewport.

4.Avoiding prop drilling through good state architecture.

-Deeply nested component trees that pass props through many layers cause unnecessary re-renders. Lifting state correctly and using context or a lightweight tool like Zustand that keeps re-renders contained to the components that actually care about a given piece of state.

5.Image optimization - lazy loading images below the fold, using the correct format like WebP, and always specifying width and height to avoid layout shift.


## Accessibility Practices.

1.Semantic HTML first.

-Using the right HTML element for the job, buttons for actions, anchors for navigation, fieldsets for form groups.

-A correct semantic structure gives our keyboard navigation, screen reader announcements and focus management largely for free without any ARIA at all.

2.ARIA as a last resort not a first instinct.

-No ARIA is better than incorrect ARIA, ensure that the correct semantic HTML Options have been exhausted.

-Wrong ARIA attributes actively mislead screen readers, only use to fill genuine gaps, like marking a live region updating dynamically or describing a custom component that has no HTML equivalent.

3.Focus management on dynamic content.

-When a modal opens, focus should move into it, when it closes, focus should return to the trigger element. When a route changes, focus should move to the top of the new page or the main heading. 

4.Color constraint.

-Contrast rations checked agains WCAG AA as a baseline, and the error states, status indicators and interactive elements communicate meaning through text or shape, working for users with color vision deficiencies.

5.Keyboard testing as a habit.

-Before considering a feature done, tab though with a keyboard and verify the full flow works without a mouse.


    Both performance and accessibility share the same underlying principle - these are not features bolt on at the end, they degrade invisibly when ignored, and only become obvious when measured or when user tries to use the app.



## Release Pipeline.

1.Branching strategy.

-