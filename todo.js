const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addtask(){
    if(inputbox.value===''){
        alert("You must write something");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7"; //"\u00d7": This is a Unicode character representing the multiplication sign (×). In this context, it’s commonly used to symbolize a close or delete action (like a "remove" button). Using Unicode allows for easy insertion of special characters.
        li.appendChild(span); 
    }
    inputbox.value="";
    saveData()
}

/*--if(inputbox.value === ''){
    alert("You must write something");

    inputbox.value === '': This condition checks if the value of the inputbox (an HTML input element) is an empty string. If it is empty, it means the user hasn't entered any text.
alert("You must write something");: If the condition is true (the input is empty), it triggers an alert box that informs the user that they need to enter something.

else {
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listcontainer.appendChild(li);

    else { ... }: If the input is not empty, the code inside the else block will execute.
let li = document.createElement("li");: A new list item (<li>) is created. This will represent the new entry in the list.
li.innerHTML = inputbox.value;: The inner HTML of the newly created list item is set to the current value of the inputbox. This effectively adds the text entered by the user to the list.
listcontainer.appendChild(li);: The new list item (li) is then appended to listcontainer, which is likely a <ul> or <ol> element in the HTML where all the list items are displayed.

let span = document.createElement("span");
span.innerHTML = "\u00d7";
li.appendChild(span);

let span = document.createElement("span");: A new <span> element is created. This is often used to display inline elements or additional information.
span.innerHTML = "\u00d7";: The inner HTML of the span is set to "\u00d7", which represents the multiplication sign (×). This symbol is commonly used as a 'close' or 'delete' button in user interfaces.
li.appendChild(span);: The span is appended to the list item (li). This means the close button will appear next to the text in the list.

inputbox.value = "";

inputbox.value = "";: Finally, this line clears the input box by setting its value back to an empty string. This allows the user to enter a new item without needing to manually delete the previous entry.


} --*/

listcontainer.addEventListener("click",function(e){
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData()
    }else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false);

/* listcontainer.addEventListener("click", ...): This method adds an event listener for the "click" event on the listcontainer. When the user clicks anywhere within this container, the specified function will be executed.
function(e): This is an anonymous function that takes an event object e as an argument. This object contains information about the event that occurred, including which element was clicked.
if (e.target.tagName === "LI") {
e.target: This property refers to the specific element that triggered the event. In this case, it’s the element that was clicked.
e.target.tagName === "LI": This condition checks if the clicked element is a <li> (list item). The tagName property returns the tag name of the element in uppercase, so it’s compared to "LI".
e.target.classList.toggle("checked");
e.target.classList.toggle("checked"): This method toggles the class checked on the clicked list item (<li>). If the checked class is present, it removes it; if it’s absent, it adds it. This is often used for visual feedback, such as marking a task as completed.

else if (e.target.tagName === "SPAN"): If the clicked element isn’t an <li>, this condition checks if it’s a <span>. This is likely the close button (×) that was added to each list item.

e.target.parentElement: This property refers to the parent element of the clicked <span>, which is the <li> containing the span.
.remove(): This method removes the entire <li> element from the DOM. Thus, clicking the span will delete the corresponding list item.

false: This indicates that the event listener is set to capture in the bubbling phase. In most cases, this is set to false, which means the listener responds during the bubbling phase of event propagation (when events propagate from child elements to parent elements).

*/

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}
function showdata(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showdata();

/* Certainly! Let’s explore the significance of the false parameter in the context of the addEventListener method:

The addEventListener Method
The addEventListener method in JavaScript is used to set up a function that will be called whenever a specified event is delivered to the target (in this case, listcontainer). The general syntax is:

javascript
Copy code
element.addEventListener(event, function, useCapture);
event: A string that specifies the name of the event to listen for (e.g., "click").
function: The function to execute when the event occurs.
useCapture: A boolean value that indicates whether to use event bubbling or capturing.
The useCapture Parameter
Understanding Event Propagation:

Event Bubbling: This is the default behavior where the event starts from the target element and bubbles up to the root of the DOM. For example, if a user clicks a nested element (like a <span> inside an <li>), the click event is first triggered on the <span>, and then it bubbles up to the <li>, and so on.
Event Capturing: This is the opposite behavior where the event starts from the root of the DOM and travels down to the target element. This means the outer elements receive the event first, before it reaches the innermost target.
false Parameter:

By passing false as the third argument to addEventListener, you indicate that you want to use the bubbling phase. This is the most common use case and allows the event to propagate from the target element up through its ancestors.
When set to false, the event listener will execute in the order of the DOM hierarchy:
If you click on an <li>, the click event will be handled first by that <li>, and then by any parent elements (like listcontainer), if they also have event listeners for that event.
Implications of Using false:

Simpler Event Handling: Since most developers expect events to bubble, using false makes it easier to manage interactions without needing to handle both capturing and bubbling phases.
Performance: While not typically a major concern for most applications, using bubbling can lead to better performance in complex UIs where deep capturing might require unnecessary processing.
Flexibility: If you later decide you need to handle events in the capturing phase, you can change the third parameter to true. However, this is less common for most user interactions.
Example
To illustrate the difference, consider the following HTML structure:

html
Copy code
<ul id="listcontainer">
    <li>
        Task 1
        <span class="close">×</span>
    </li>
</ul>
If you have an event listener on both the <li> and the listcontainer, using false for the <li> will ensure the event is handled like this:

Clicking the <span>:
The click event first triggers the listener on the <span>.
The event then bubbles up to the <li>, where it can be processed if there’s another listener there.
Finally, it bubbles up to listcontainer.
If you were to set true instead:

The event would be captured starting from listcontainer, then going down to the <li>, and finally reaching the <span>.
Summary
In summary, the false parameter in addEventListener specifies that the event listener should use event bubbling, which is the default behavior. This is generally more intuitive for handling user interactions, as events will be processed from the target element up through its ancestors. Understanding this aspect of event propagation is crucial for effectively managing interactions in JavaScript applications.

*/