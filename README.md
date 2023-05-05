# bThere

## Description
Manage your RSVP lists for all of life's events with bThere. Simply create a form, add your questions, share, and....let the RSVPs flow in.

## Technlogies
bThere is a full stack application utilizing Rails and React/Redux to manage all the complexities of event management.

## Features
- create an attendance form to send to your invite list
- add, edit, and delete custom questions on your form for attendees to answer
- add, edit, and remove photos to display on your form
- view responses and download the responses to a csv

## Challenges
### Dynamic Input Processing
Unlike simple forms that have a fixed set of inputs, bThere allows the user to create their own forms with an arbitrary number of questions they create. This added significant management complexity in terms of tracking all the input elements and processing them through to the front end.

For example, the following code dynamically renders all fields presented to the submitter.

The ResponsePage initializes a state variable to house all the references to the questions the form owner had created
```
export default function ResponsePage (props) {

    const [refs, setRefs] = useState({}); 
```
The component creates a map over all the questions, passing in the setter and getter

```
{questions.map((q) => {
                    return(
                        <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs}/>
                    )})}
```

The underlying ResponsePane adds references to its inputs to the list of refs
```
export default function ResponsePane ({question, setRefs, refs}) {

    const [response, setResponse] = useState("");
    const inputRef = useRef();

    // console.log(refs.length, "REFS");

    useEffect(()=> {
        setRefs((prevRefs) => ({...prevRefs, [question.id]: inputRef}));
    }, [])
    

    // debugger;
    return (
        <div className="rpane-wrapper">
            <label htmlFor={question.id}>{question.prompt}</label>
            {question.description}
            <textarea ref={inputRef} id={question.id} data-question-id={question.id}
            value={response} onChange={(e) => {setResponse(e.target.value)}}/>
        </div>
    );
}
```
Upon submission, the ResponsePage iterates through all the elements and parses them into back end compatible format.

```
function postResponse() {

        const keys = Object.keys(refs);

        const submission = { submission: 
            {
                formId,
                name,
                email,
                status: attendStatus,
                responses: []
            }
        }

        keys.forEach(key => {
            const ref = refs[key];
            submission['submission']['responses'].push({questionId: ref.current.dataset.questionId, answer: ref.current.value})
        });

        csrfFetch('/api/submissions',{
            method: 'POST',
            body: JSON.stringify(submission)
        }).then((data) => {
            setSubmitted(true);
        })
    }
```

## Data Management
Event management software involves many interrelated assets, including a form with dynamic questions, corresponding submitters, along with their own responses.

## CSV Output
The CSV input feature involves bringing together several slices of state into a singular backage, requiring significant processing on the front end.

