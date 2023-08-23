const model = {
    currentProjectId: null,
    projects: [
        {
            id: 1,
            name: "Multi Step Form",
            langs: "HTML, CSS, JavaScript",
            description: "A multi-step form component challenge from frontendmentor.io",
            img: "../imgs/MultiStepForm.png",
            github: "https://github.com/TaylorPrescott/multi-step-form",
            demo: "https://taylorprescott.github.io/multi-step-form/"
        },
        {
            id: 2,
            name: "QR Code",
            langs: "HTML, CSS",
            description: "A QR Code component challenge from frontendmentor.io",
            img: "../imgs/QR-Code-Project.png",
            github: "https://github.com/TaylorPrescott/qr-code-component",
            demo: "https://taylorprescott.github.io/qr-code-component/"
        },
        {
            id: 3,
            name: "Results Project",
            langs: "HTML, CSS",
            description: "A results component challenge from frontendmentor.io",
            img: "../imgs/Results-Project.png",
            github: "https://github.com/TaylorPrescott/results-summary-component",
            demo: "https://taylorprescott.github.io/results-summary-component/"
        }
    ],
    formData: {
        name: null,
        email: null,
        msg: null
    }
};

const projectsView = {
    init() {
        // this.currentProject = controller.getRandomProject();
        let options = {
            threshold: 0.7
        };
        let target = document.getElementById("projects");
        let observer = new IntersectionObserver(projectsView.render, options);
        
       observer.observe(target);
    }, 

    changePadding() {
        const appendedProjects = document.querySelector(".projects-wrapper").children;
            for (let i = 0; i < appendedProjects.length; i++) {
                appendedProjects[i].style.padding = "0 " + ((window.innerWidth - 250) / 2) + "px";
            }
            console.log("changePadding...");
    },

    render(entries, observer) {
        console.log("rendering...");
        const projects = controller.getProjects();

        if (entries[0].isIntersecting) {
            console.log("is intersecting");
            for (let i = 0; i < projects.length; i++) {
                let projectDiv = document.createElement("div");
                let img = document.createElement("img");
                let descriptionDiv = document.createElement("div");
                let h2 = document.createElement("h2");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let btnDiv = document.createElement("div");
                let demoBtn = document.createElement("button");
                let githubBtn = document.createElement("button");
                let githubAnchor = document.createElement("a");
                let demoAnchor = document.createElement("a");
    
                projectDiv.classList.add("project");
                img.id = "projectImg";
                descriptionDiv.classList.add("project-description");
                img.src = projects[i].img;
                h2.textContent = projects[i].name;
                h3.textContent = projects[i].langs;
                p.textContent = projects[i].description;
                githubBtn.classList.add("project-btn");
                githubAnchor.textContent = "Github";
                githubAnchor.href = projects[i].github;
                githubBtn.appendChild(githubAnchor);
                demoBtn.classList.add("project-btn");
                demoAnchor.textContent = "Demo";
                demoAnchor.href = projects[i].demo;
                demoBtn.appendChild(demoAnchor);
                btnDiv.appendChild(githubBtn);
                btnDiv.appendChild(demoBtn);
                btnDiv.classList.add("project-btns-div");
    
                projectDiv.appendChild(img);
                descriptionDiv.appendChild(h2);
                descriptionDiv.appendChild(h3);
                descriptionDiv.appendChild(p);
                projectDiv.append(descriptionDiv);
                projectDiv.append(btnDiv);

                document.querySelector(".projects-wrapper").append(projectDiv);
                
            }
            projectsView.changePadding();
            observer.unobserve(document.getElementById("projects"));
        }
        controller.setCurrentProject(projects[0].id);
        window.addEventListener("resize", projectsView.changePadding);
    }
};

const formView = {
    init() {
        const contactForm = document.getElementById("contactForm");
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = contactForm.children[2];
            const email = contactForm.children[5];
            const msg = contactForm.children[8];
            controller.setFormData(name.value, email.value, msg.value);
            this.render();
        });   
    },
    appendMsgResponse() {
        let p = document.createElement("p");
        p.classList.add("msg-response");
        p.textContent = "Thanks for reaching out. You'll receive a reply soon.";
        document.getElementById("contact").append(p);
    },
    formValidator(formData) {
        const nameErrorEl = document.getElementById("nameError");
        const emailErrorEl = document.getElementById("emailError");
        const msgErrorEl = document.getElementById("msgError");
        nameErrorEl.textContent = "";
        emailErrorEl.textContent = "";
        msgErrorEl.textContent = "";

        let validName = false;
        let validEmail = false;
        let validMsg = false;

        const charRegEx = /[^a-zA-Z0-9@\.!-\s_]/;
        //? - match preceding char 0 or 1 times, + - match preceding char 1 or more times, * matches char preceding it 0 or more times. 
        //$ - match end of string (only return match when text or string it is attached to is at end of line)
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (charRegEx.test(formData.name)) {
            nameErrorEl.textContent = "Invalid character used.";
            validName = false;
        } else if (formData.name === "undefined" || formData.name === "") {
            nameErrorEl.textContent = "Name is required."
            validName = false;
        } else {
            console.log("passed");
            validName = true;
        }

        if (emailRegEx.test(formData.email)) {
            console.log("email passed");
            validEmail = true;
        } else {
            emailErrorEl.textContent = "Invalid character used.";
            validEmail = false;
        }

        if (charRegEx.test(formData.msg)) {
            msgErrorEl.textContent = "Invalid character used.";
            validMsg = false;
        } else if (formData.msg === "undefined" || formData.msg === "") {
            msgErrorEl.textContent = "Message is required.";
            validMsg = false;
        } else {
            console.log(formData.msg);
            validMsg = true;
        }

        if (validName && validEmail && validMsg) {
            document.getElementById("contactForm").classList.add("hide");
            this.appendMsgResponse();
        }
    },
    render() {
        console.log("form render");
        this.formValidator(controller.getFormData());
    }
};


const controller = {
    init() {
        projectsView.init();
        formView.init();
    },
    // getRandomProject() {
    //     let x = Math.floor(Math.random() * model.projects.length);
    //     console.log(x);
    //     return model.projects[x];
    // },
    getProjects() {
        return model.projects;
    },
    getCurrentProjectId() {
        return model.currentProjectId;
    },
    setCurrentProject(id) {
        model.currentProjectId = id;
    },
    getFormData() {
        return model.formData;
    },
    setFormData(name, email, msg) {
        model.formData.name = name;
        model.formData.email = email;
        model.formData.msg = msg;
    }

};

controller.init();


// console.time("perf");
// console.timeEnd("perf");

