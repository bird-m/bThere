# [bThere](https://b-there.herokuapp.com/)

## Description
Create events, send customized invitation forms, and track responses with bThere, an RSVPify inspired full stack event management suite powered by Rails, React/Redux, PostgreSQL, AWS, HTML5, and CSS3.

## Getting Started
### Create Event
Upon logging in, create a new event from the forms page, providing the following:
- an event title
- an event description (optional)
- an event photo (optional)
If you'd like to restrict your invitation to only be viewed by specific guests, select the invite only option.
### Modify Event
Once you've created an event, the fun really begins! You can:
- add and edit supplementary questions for your guests to answer in addition to marking their attendance
- designate which of your contacts will be able to view and respond to the invitation (if it is an invite only event)
- update the title, description, and privacy of your event as needed
### Send Invitation
Once you've customized the invitation to your liking, copy your invitation link and share it how you see fit!
### View Responses
View the respsonses as they come in on the invitation response page, which summarizes each guests attendance status. Download the responses to view the answers to supplementary questions.

## Technlogies
bThere is a full stack application utilizing Rails and React/Redux to manage all the complexities of event management.

## Features
bThere's end to end event management capabilities enables you to:
- create an event and upload an event photo to be associated with your invitation
- create an unlimited number of supplemental short answer questions for guests to answer
- create and manage a guest list for each event, preventing non-guests from viewing the invitation
- view and download responses to csv format


## Challenges
### Dynamic Input Processing
bThere's invitation configurator allows the user to create an arbitrary number of short answer questions later rendered to, and answered by, guests.

Breaking the traditional paradigm of a form collecting a pre-determined set of inputs from a user added significant complexity to the project, forcing the invitation to dynamically render a variable number of questions stored in the database by the event host.

To accomplish this feat, the ResponsePage component, responsible for rendering the full set of supplemental questions, creates a state variable to store references to the supplemental questions

```
export default function ResponsePage(props) {

const [refs, setRefs] = useState({}); ...
```

The listQuestions function maps through the event's supplemental questions, generating a corresponding ResponsePane, providing it question details and the reference variable declared earlier.
```
function listQuestions() {
    if (attendStatus === "accept" && questions.length > 0) {
        return (<>
            <div className="ql-header">
                {questions.length > 0 ? "Amazing! Please answer these event related questions" : null}
            </div>
            <div className="ql-added-questions no-gap">
                {questions.map((q) => {
                    return (
                        <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs} />
                    )
                })}
            </div>
        </>)
    }
}
```

The ResponsePane component creates an input for the question, and inserts a reference to it within the refs object, utilizing the spread operator in order not to overwrite any previous questions
```
export default function ResponsePane ({question, setRefs, refs}) {

    const [response, setResponse] = useState("");
    const inputRef = useRef();

    useEffect(()=> {
        setRefs((prevRefs) => ({...prevRefs, [question.id]: inputRef}));
    }, [])

    return (<div className="rpane-wrapper">
        <label htmlFor={question.id}>{question.prompt}</label>
        {question.description}
        <textarea ref={inputRef} id={question.id} data-question-id={question.id}
        value={response} onChange={(e) => {setResponse(e.target.value)}}/>
        </div>
    );
}
```

Unlike simple forms that have a fixed set of inputs, 

The invitation UX, 

This added significant management complexity in terms of tracking all the input elements and processing them through to the front end.

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

