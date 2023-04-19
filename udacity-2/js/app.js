/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
toTop.style.visibility="hidden";
/**
 * Define Global Variables
 * 
*/
const ulNav=document.getElementById("navbar__list");
const main=document.querySelector("main");
const header=document.querySelector("header");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isTopVw(element) {
    // get the coordinates of the element box from the viewport
    const top_cordinate = element.getBoundingClientRect().top;
    // return true if the element top is near the top of the viewport, false otherwise
    return (
        top_cordinate >= -100 && top_cordinate <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navigation
function buildNav(){
    // Clear the navigation ul for next use
    ulNav.innerHTML="";
    const sections=document.querySelectorAll("main>section");
    const fragment=document.createDocumentFragment();
    // Iterate through each section
    for(let section of sections){
        //* Creating the navigation */
        const list=document.createElement("li");
        // Link to call appropriate section
        // Link's information
        const link=document.createElement("a");
        link.className="menu__link";
        // To navigate which section when anchor
        link.setAttribute("href","#"+section.id);
        link.textContent=section.getAttribute("data-nav");
        // When the link is clicked
        link.addEventListener("click",scrollToAnchor);
        // Using Fragment to boost speed
        list.appendChild(link);
        fragment.appendChild(list);

        //* Add plus or minus icon to collapse for new sections */
        // In order not to write the same code 2 times, I wrote here
        // more or less
        const icon=section.querySelector("h2>i");
        icon.classList.add("more");
        icon.addEventListener("click", moreOrLess, true);
    }
    // Append the DocumentFragment so that the browser shows
    ulNav.appendChild(fragment);
}

buildNav();

// Add class 'active' to section when near top of viewport
function beActive(){
    //active class
    const sections=document.querySelectorAll("main>section");
    // Check for each section whether it is on top of the viewport
    for(let section of sections){
        // find the appropriate nav list
        const  navItem=document.querySelector(`#navbar__list>li>a[href="#${section.id}"]`);
        //call the function
        if(isTopVw(section)){
            section.classList.add("active");
            navItem.classList.add("menu__link--active");
        }else{
            section.classList.remove("active");
            navItem.classList.remove("menu__link--active");
        }
    }
}

// Scroll to anchor ID using scrollBy event
function scrollToAnchor(e){
    // Prevent the Default actions
    e.preventDefault();
    const y=document.querySelector(e.target.getAttribute("href")).getBoundingClientRect()["y"];
    // There is an element on top of the window when it is scrolled by its y axis value
    // and scroll will be smooth
    window.scrollBy({
        top: y,
        left: 0, 
        behavior:"smooth"
    })
}



/**
 * End Main Functions
 * Events
*/

//When there is a scroll on document then:
document.addEventListener("scroll",(e)=>{
    //hide navigation
    header.style.visibility="hidden";
    setTimeout(()=>{
        header.style.visibility="visible";
    },500);

    //toTop button active when:
    const toTop=document.getElementById("toTop");
    if(document.body.scrollTop>100) toTop.style.visibility="visible";
    else toTop.style.visibility="hidden";
    
    //Make Active the Section by adding "active" to its class
    beActive();    
});



//Go back link (return to top)
document.querySelector("#toTop").addEventListener("click",(e)=>{
    e.preventDefault();
    document.body.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    });
})

// More or Less Content
// Collapse the content
function moreOrLess(e){
    const landing_container=e.target.parentElement.parentElement;
    if(e.target.className.search("more")>=0){
        // Collapse the section
        // Plus icon
        e.target.className="far fa-plus-square less";
        landing_container.classList.remove("landing_more");
        landing_container.classList.add("landing_less");
        landing_container.parentElement.style.minHeight="190px";
    }else{
        // Return to original
        // Minus icon
        e.target.className="far fa-minus-square more";
        landing_container.classList.remove("landing_less");
        landing_container.classList.add("landing_more");
        landing_container.parentElement.style.minHeight="60vh";
    }
}

/**
 * Write your own section
 * New Section
*/

function newSection(e){
    // New Section ID number
    const newSectionNum=document.querySelectorAll("main>section").length+1;
    // Section Element
    e.preventDefault();
    const section=document.createElement("section");
    section.id=`section${newSectionNum}`;
    section.setAttribute("data-nav",`Section ${newSectionNum}`);
    // Div Element
    const div=document.createElement("div");
    div.className="landing__container";
    // h2 element for heading
    const heading=document.createElement("h2");
    heading.textContent=document.querySelector("form>#heading").value+" ";
    heading.innerHTML+=`<i class="far fa-minus-square"></i>`;
    // both p elements for body and about-author, respectively
    const p1=document.createElement("p");
    p1.textContent=document.querySelector("form>#body").value;
    const p2=document.createElement("p");
    p2.textContent=document.querySelector("form>#about").value;
    // Append elements so that the browser shows
    div.appendChild(heading);
    div.appendChild(p1);
    div.appendChild(p2);
    section.appendChild(div);
    main.appendChild(section);


    // Update the content
    // Update the form
    document.querySelector("form>#heading").value="";
    document.querySelector("form>#body").value="";
    document.querySelector("form>#about").value="";
    // Recreate Navigation
    buildNav();
}
// Button of the form to send the information
const sendButton=document.querySelector("form>button");
sendButton.addEventListener("click",newSection);
