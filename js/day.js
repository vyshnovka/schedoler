function showDay(date) {
    if (date) {
        tempDate = new Date(date);
    }
    rebuildContent(buildDay, tempDate);
}

function buildDay(currentDate) {
    document.getElementById('choosen').innerHTML = day[currentDate.getDay()] + ", " + month[currentDate.getMonth()] + " " + currentDate.getDate();

    display = showDay;
    changeDisplay(document.getElementById("day"));

    var newElement = document.createElement('div');
    newElement.className = "thisDay";

    var events = document.createElement('div');
    events.className = "dayEvents";

    let date = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

    if (category) {
        var query = "SELECT p.id_plan, p.name, p.description, c.name category, e.place, e.time_start, e.time_end FROM events e join plans p on p.id_plan = e.id_plan join category c on p.id_category = c.id_category where p.date = ? and p.id_user = (SELECT id_user FROM users where name = ?) and c.name = ? order by e.time_start";
    }
    else {
        var query = "SELECT p.id_plan, p.name, p.description, c.name category, e.place, e.time_start, e.time_end FROM events e join plans p on p.id_plan = e.id_plan join category c on p.id_category = c.id_category where p.date = ? and p.id_user = (SELECT id_user FROM users where name = ?) order by e.time_start";
    }

    db.each(query, [date, userName, category], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        else {
            var eventDay = document.createElement("div");
            eventDay.className = "eventDay";

            var eventTime = document.createElement("div");
            eventTime.className = "time";

            var eventTimeStart = document.createElement("div");
            eventTimeStart.className = "timeStart";
            var eventTimeEnd = document.createElement("div");
            eventTimeEnd.className = "timeEnd";

            var text = document.createTextNode(row.time_start);
            eventTimeStart.appendChild(text);
            text = document.createTextNode(row.time_end ? row.time_end : " ");
            eventTimeEnd.appendChild(text);

            eventTime.appendChild(eventTimeStart);
            eventTime.appendChild(eventTimeEnd);
            eventDay.appendChild(eventTime);

            var nameDescription = document.createElement("div");
            nameDescription.className = "eventNameDescription";

            var eventName = document.createElement("div");
            eventName.className = "eventName";

            text = document.createTextNode(row.name);

            eventName.appendChild(text);
            nameDescription.appendChild(eventName);

            var eventDescription = document.createElement("div");
            eventDescription.className = "eventDescription";

            if (row.description) {
                text = document.createTextNode(row.description);
            }
            else {
                text = document.createTextNode(" ");
            }

            eventDescription.appendChild(text);
            nameDescription.appendChild(eventDescription);

            var eventPlace = document.createElement("div");
            eventPlace.className = "eventPlace";

            text = document.createTextNode(row.place);

            eventPlace.appendChild(text);
            nameDescription.appendChild(eventPlace);

            eventDay.appendChild(nameDescription);

            var eventEditDelete = document.createElement("div");
            eventEditDelete.className = "eventEditDelete";

            var eventRepeat = document.createElement("div");
            eventRepeat.className = "eventRepeat";
            eventRepeat.title = "Repeat";

            var image = document.createElement("img");
            image.src = "../img/repeat.png";

            eventRepeat.onclick = function () {
                rebuildContent(repeatEvent, row.id_plan);
            };

            eventRepeat.appendChild(image);
            eventEditDelete.appendChild(eventRepeat);

            var eventEdit = document.createElement("div");
            eventEdit.className = "eventEdit";
            eventEdit.title = "Edit";

            var image = document.createElement("img");
            image.src = "../img/edit.png";

            eventEdit.onclick = function () {
                editID = row.id_plan;
                nameValue = row.name;
                planDateValue = row.date;
                descriptionValue = row.description;
                categoryValue = row.category;
                typeValue = "event";
                timeStartValue = row.time_start;
                timeEndValue = row.time_end;
                placeValue = row.place;

                newPlanForm(tempDate);
            };

            eventEdit.appendChild(image);
            eventEditDelete.appendChild(eventEdit);

            var eventDelete = document.createElement("div");
            eventDelete.className = "eventDelete";
            eventDelete.title = "Delete";

            image = document.createElement("img");
            image.src = "../img/delete.png";

            eventDelete.onclick = function () {
                if (confirm('Are you sure you want to delete this plan?')) {
                    db.run("DELETE FROM events WHERE id_plan = ?", row.id_plan, (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                        db.run("DELETE FROM plans WHERE id_plan = ?", row.id_plan, (err) => {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                    });
                    alert('Plan "' + row.name + '" deleted successfully! ');
                    rebuildContent(buildDay, tempDate);
                }
            };

            eventDelete.appendChild(image);
            eventEditDelete.appendChild(eventDelete);

            eventDay.appendChild(eventEditDelete);

            var eventCategory = document.createElement("div");
            eventCategory.className = "eventCategory";

            image = document.createElement("img");
            image.src = "../img/" + row.category + ".png";

            eventCategory.appendChild(image);
            eventDay.appendChild(eventCategory);

            events.appendChild(eventDay);
        }
    });

    var tasks = document.createElement('div');
    tasks.className = "dayTasks";

    if (category) {
        var query = "SELECT p.id_plan, p.name, p.description, c.name category, t.urgency, t.progress FROM tasks t join plans p on p.id_plan = t.id_plan join category c on p.id_category = c.id_category where p.date = ? and p.id_user = (SELECT id_user FROM users where name = ?) and c.name = ? order by t.urgency desc";
    }
    else {
        var query = "SELECT p.id_plan, p.name, p.description, c.name category, t.urgency, t.progress FROM tasks t join plans p on p.id_plan = t.id_plan join category c on p.id_category = c.id_category where p.date = ? and p.id_user = (SELECT id_user FROM users where name = ?) order by t.urgency desc";
    }

    db.each(query, [date, userName, category], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        else {
            var taskDay = document.createElement("div");
            taskDay.className = "taskDay";

            var taskProgress = document.createElement("div");
            taskProgress.className = "taskProgress";

            var taskProgressCheck = document.createElement("div");
            taskProgressCheck.className = "taskProgressCheck";

            if (row.progress == 1) {
                taskDay.style.backgroundColor = "#fcfcfc";
                var image = document.createElement("img");
                image.src = "../img/done.png";
                taskProgressCheck.appendChild(image);
            } 

            taskProgressCheck.onclick = function () {
                db.get("SELECT progress FROM tasks where id_plan = ?", [row.id_plan], (err, newRow) => {
                    if (err) {
                        console.log(err.message);
                    }
                    if (newRow.progress == 1) {
                        taskDay.style.backgroundColor = "#ffffff";
                        var newProgress = 0;
                        taskProgressCheck.removeChild(taskProgressCheck.lastChild);
                    } 
                    else {
                        taskDay.style.backgroundColor = "#fafafa";
                        var newProgress = 1;
                        var image = document.createElement("img");
                        image.src = "../img/done.png";
                        taskProgressCheck.appendChild(image);
                    }
                    
                    db.run("UPDATE tasks SET progress = ? where id_plan = ?", [newProgress, row.id_plan], (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                    });
                });
            };
            taskProgress.appendChild(taskProgressCheck);

            taskDay.appendChild(taskProgress);

            var nameDescription = document.createElement("div");
            nameDescription.className = "taskNameDescription";

            var taskNameUrgency = document.createElement("div");
            taskNameUrgency.className = "taskNameUrgency";

            var taskName = document.createElement("div");
            taskName.className = "taskName";

            text = document.createTextNode(row.name);

            taskName.appendChild(text);
            taskNameUrgency.appendChild(taskName);

            var taskUrgency = document.createElement("div");
            taskUrgency.className = "taskUrgency";

            var image = document.createElement("img");
            image.src = "../img/" + row.urgency + ".png";

            taskUrgency.appendChild(image);
            taskNameUrgency.appendChild(taskUrgency);

            nameDescription.appendChild(taskNameUrgency);

            var taskDescription = document.createElement("div");
            taskDescription.className = "taskDescription";

            if (row.description) {
                text = document.createTextNode(row.description);
            }
            else {
                text = document.createTextNode(" ");
            }

            taskDescription.appendChild(text);
            nameDescription.appendChild(taskDescription);

            taskDay.appendChild(nameDescription);

            var taskEditDelete = document.createElement("div");
            taskEditDelete.className = "taskEditDelete";

            var taskRepeat = document.createElement("div");
            taskRepeat.className = "taskRepeat";
            taskRepeat.title = "Repeat";

            var image = document.createElement("img");
            image.src = "../img/repeat.png";

            taskRepeat.onclick = function () {
                rebuildContent(repeatTask, row.id_plan);
            };

            taskRepeat.appendChild(image);
            taskEditDelete.appendChild(taskRepeat);

            var taskEdit = document.createElement("div");
            taskEdit.className = "taskEdit";
            taskEdit.title = "Edit";

            var image = document.createElement("img");
            image.src = "../img/edit.png";

            taskEdit.onclick = function () {
                editID = row.id_plan;
                nameValue = row.name;
                planDateValue = row.date;
                descriptionValue = row.description;
                categoryValue = row.category;
                typeValue = "task";
                urgencyValue = row.urgency;

                newPlanForm(tempDate);
            };

            taskEdit.appendChild(image);
            taskEditDelete.appendChild(taskEdit);

            var taskDelete = document.createElement("div");
            taskDelete.className = "taskDelete";
            taskDelete.title = "Delete";

            image = document.createElement("img");
            image.src = "../img/delete.png";

            taskDelete.onclick = function () {
                if (confirm('Are you sure you want to delete this plan?')) {
                    db.run("DELETE FROM tasks WHERE id_plan = ?", row.id_plan, (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                        db.run("DELETE FROM plans WHERE id_plan = ?", row.id_plan, (err) => {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                    });
                    alert('Plan "' + row.name + '" deleted successfully! ');
                    rebuildContent(buildDay, tempDate);
                }
            };

            taskDelete.appendChild(image);
            taskEditDelete.appendChild(taskDelete);

            taskDay.appendChild(taskEditDelete);

            var taskCategory = document.createElement("div");
            taskCategory.className = "taskCategory";

            image = document.createElement("img");
            image.src = "../img/" + row.category + ".png";

            taskCategory.appendChild(image);
            taskDay.appendChild(taskCategory);

            tasks.appendChild(taskDay);
        }
    });

    newElement.appendChild(events);
    newElement.appendChild(tasks);
    parent.appendChild(newElement);
};

function repeatTask(repeatID) {
    var repeatForm = document.createElement('div');
    repeatForm.className = "repeatForm";

    var repeatDate = document.createElement('input');
    repeatDate.className = "repeatDate";
    repeatDate.type = "date";
    repeatDate.autofocus = "autofocus";
    repeatDate.id = "repeatDate";
    
    repeatForm.appendChild(repeatDate);

    var create = document.createElement('input');
    create.className = "button create";
    create.type = "button";
    create.value = "Repeat plan";

    create.onclick = function () {
        db.get("SELECT max(id_plan) max_id FROM plans", [], (err, row) => {
            if (err) {
                console.log(err);
            }
            else {
                var p_id_plan = row.max_id + 1;

                db.get("SELECT p.id_plan, p.id_user, p.name, p.description, p.date, p.id_category, t.urgency, t.progress FROM plans p natural join tasks t where p.id_plan = ?", repeatID, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var p_name = row.name;
                        var p_id_user = row.id_user;
                        var p_description = row.description;
                        var p_date = new Date(document.getElementById('repeatDate').value);
                        p_date = p_date.getDate() + '/' + (p_date.getMonth() + 1) + "/" + p_date.getFullYear();
                        var p_id_category = row.id_category;
                        var p_urgency = row.urgency;

                        db.run("INSERT INTO plans(id_plan, id_user, name, description, date, id_category) values(?, ?, ?, ?, ?, ?)", [p_id_plan, p_id_user, p_name, p_description, p_date, p_id_category], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        db.run("INSERT INTO tasks(id_plan, urgency) VALUES(?, ?)", [p_id_plan, p_urgency], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        alert('Task ' + '"' + row.name + '"' + ' repeated successfully!');
                        showWeek();
                    }
                });
            }
        });
    }

    repeatForm.appendChild(create);
    parent.appendChild(repeatForm);
};

function repeatEvent(repeatID) {
    var repeatForm = document.createElement('div');
    repeatForm.className = "repeatForm";

    var repeatDate = document.createElement('input');
    repeatDate.className = "repeatDate";
    repeatDate.type = "date";
    repeatDate.autofocus = "autofocus";
    repeatDate.id = "repeatDate";
    
    repeatForm.appendChild(repeatDate);

    var create = document.createElement('input');
    create.className = "button create";
    create.type = "button";
    create.value = "Repeat plan";

    create.onclick = function () {
        console.log(repeatID);
        console.log(repeatDate.value);
        db.get("SELECT max(id_plan) max_id FROM plans", [], (err, row) => {
            if (err) {
                console.log(err);
            }
            else {
                var p_id_plan = row.max_id + 1;

                db.get("SELECT p.id_plan, p.id_user, p.name, p.description, p.date, p.id_category, e.time_start, e.time_end, e.place FROM plans p natural join events e where p.id_plan = ?", repeatID, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var p_name = row.name;
                        var p_id_user = row.id_user;
                        var p_description = row.description;
                        var p_date = new Date(document.getElementById('repeatDate').value);
                        p_date = p_date.getDate() + '/' + (p_date.getMonth() + 1) + "/" + p_date.getFullYear();
                        var p_id_category = row.id_category;
                        var p_time_start = row.time_start;
                        var p_time_end = row.time_end;
                        var p_place = row.place;

                        db.run("INSERT INTO plans(id_plan, id_user, name, description, date, id_category) values(?, ?, ?, ?, ?, ?)", [p_id_plan, p_id_user, p_name, p_description, p_date, p_id_category], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        db.run("INSERT INTO events(id_plan, time_start, time_end, place) VALUES (?, ?, ?, ?)", [p_id_plan, p_time_start, p_time_end, p_place], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        alert('Event ' + '"' + row.name + '"' + ' repeated successfully!');
                        showWeek();
                    }
                });
            }
        });
    }

    repeatForm.appendChild(create);
    parent.appendChild(repeatForm);
};