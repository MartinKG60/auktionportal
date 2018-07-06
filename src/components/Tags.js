import React, { Component } from "react";

class Tags extends Component {
    componentDidMount() {
        console.log(this.props);

        [].forEach.call(document.getElementsByClassName("tags-input"), function(el) {
            let hiddenInput = document.createElement("input"),
                mainInput = document.createElement("input"),
                tags = [];

            hiddenInput.setAttribute("type", "hidden");
            hiddenInput.setAttribute("id", "tags");
            hiddenInput.setAttribute("name", el.getAttribute("data-name"));

            mainInput.setAttribute("type", "text");
            mainInput.setAttribute("placeholder", "Tilføj 'tags' til din auktion, så den er lettere at fremsøge");
            mainInput.classList.add("tags-input__input");
            mainInput.addEventListener("input", function() {
                let enteredTags = mainInput.value.split(",");
                if (enteredTags.length > 1) {
                    enteredTags.forEach(function(t) {
                        let filteredTag = filterTag(t);
                        if (filteredTag.length > 0) addTag(filteredTag);
                    });
                    mainInput.value = "";
                }
            });

            mainInput.addEventListener("keydown", function(e) {
                let keyCode = e.which || e.keyCode;
                if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
                    removeTag(tags.length - 1);
                }
            });

            el.appendChild(mainInput);
            el.appendChild(hiddenInput);

            addTag("Hello");

            function addTag(text) {
                let tag = {
                    text: text,
                    element: document.createElement("span")
                };

                tag.element.classList.add("tags-input__tag");
                tag.element.textContent = tag.text;

                let closeBtn = document.createElement("span");
                closeBtn.classList.add("tags-input__tag--close");
                closeBtn.addEventListener("click", function() {
                    removeTag(tags.indexOf(tag));
                });
                tag.element.appendChild(closeBtn);

                tags.push(tag);

                el.insertBefore(tag.element, mainInput);

                refreshTags();
            }

            function removeTag(index) {
                let tag = tags[index];
                tags.splice(index, 1);
                el.removeChild(tag.element);
                refreshTags();
            }

            function refreshTags() {
                let tagsList = [];
                tags.forEach(function(t) {
                    tagsList.push(t.text);
                });
                hiddenInput.value = tagsList.join(", ");
            }

            function filterTag(tag) {
                return tag
                    .replace(/[^\w -]/g, "")
                    .trim()
                    .replace(/\W+/g, "-");
            }
        });
    }
    render() {
        return <div className="tags-input" data-name="tags-input" />;
    }
}

export default Tags;
