function newPlanForm(tempDate) {
    if (tempDate) {
        var date = tempDate.getFullYear() + "-" + "0" + (tempDate.getMonth() + 1) + "-" + "0" + tempDate.getDate();
    }
    rebuildContent(buildPlan, date);
}

var editID = null;
var nameValue = null;
var planDateValue = null;
var descriptionValue = null;
var typeValue = null;
var timeStartValue = null;
var timeEndValue = null;
var placeValue = null;
var categoryValue = null;
var urgencyValue = null;

function buildPlan(date) {
    var planForm = document.createElement('div');
    planForm.className = "planForm";

    var planNameDate = document.createElement('div');
    planNameDate.className = "planNameDate addMargin";

    var name = document.createElement('input');
    name.className = "data";
    name.placeholder = "Name";
    name.id = "planName";
    name.required = "required";
    if (nameValue != null) {
        name.value = nameValue;
    }
    name.autofocus = "autofocus";
    planNameDate.appendChild(name);

    var planDate = document.createElement('input');
    planDate.type = "date";
    planDate.className = "data";
    planDate.id = "planDate";
    if (planDateValue == null) {
        planDate.value = date;
    }
    else {
        planDate.value = planDateValue;
    }
    planNameDate.appendChild(planDate);

    planForm.appendChild(planNameDate);

    var planDescriptionCategory = document.createElement('div');
    planDescriptionCategory.className = "planDescriptionCategory addMargin";

    var description = document.createElement('textarea');
    description.className = "planDescription";
    description.placeholder = "Description";
    description.id = "planDescription";
    description.value = descriptionValue;
    planDescriptionCategory.appendChild(description);

    var category = document.createElement('select');
    category.className = "customSelect";
    category.id = "planCategory";
    category.required = "required";

    var option = document.createElement('option');
    option.className = "categoryOption";
    if (categoryValue == null) {
        option.selected = "selected";
    }
    option.disabled = "disabled";
    var text = document.createTextNode("Category");
    option.appendChild(text);
    category.appendChild(option);

    db.each("SELECT id_category, name FROM category", [], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            var option = document.createElement('option');
            option.className = "categoryOption";
            option.value = row.id_category;
            if (row.name == categoryValue) {
                option.selected = "selected";
            }
            var text = document.createTextNode(row.name)
            option.appendChild(text);
            category.appendChild(option);
        }
    });

    planDescriptionCategory.appendChild(category);

    planForm.appendChild(planDescriptionCategory);

    var planType = document.createElement('div');
    planType.id = "planType";

    var buttons = document.createElement('div');
    buttons.className = "buttons addMargin";

    var isEvent = document.createElement('input');
    isEvent.className = "button type";
    isEvent.type = "button";
    isEvent.value = "Event?";
    isEvent.onclick = function () {
        document.getElementById("planType").value = "event";
        document.getElementById("timeStart").disabled = "";
        document.getElementById("timeEnd").disabled = "";
        document.getElementById("placeEvent").disabled = "";
        document.getElementById("urgencyTask").disabled = "disabled";
    };
    buttons.appendChild(isEvent);

    var isTask = document.createElement('input');
    isTask.className = "button type";
    isTask.type = "button";
    isTask.value = "Task?";
    isTask.onclick = function () {
        document.getElementById("planType").value = "task";
        document.getElementById("timeStart").disabled = "disabled";
        document.getElementById("timeEnd").disabled = "disabled";
        document.getElementById("placeEvent").disabled = "disabled";
        document.getElementById("urgencyTask").disabled = "";
    };
    buttons.appendChild(isTask);

    planForm.appendChild(buttons);

    var timeStartEnd = document.createElement('div');
    timeStartEnd.className = "timeStartEnd addMargin";

    var timeStart = document.createElement('input');
    timeStart.className = "data";
    timeStart.id = "timeStart";
    timeStart.type = "time";
    timeStart.required = "required";
    if (timeStartValue != null) {
        timeStart.value = timeStartValue;
    }
    if (typeValue == "event") {
        timeStart.disabled = "";
    }
    else {
        timeStart.disabled = "disabled";
    }
    timeStartEnd.appendChild(timeStart);

    var timeEnd = document.createElement('input');
    timeEnd.className = "data";
    timeEnd.id = "timeEnd";
    timeEnd.type = "time";
    if (timeEndValue != null) {
        timeEnd.value = timeEndValue;
    }
    if (typeValue == "event") {
        timeEnd.disabled = "";
    }
    else {
        timeEnd.disabled = "disabled";
    }
    timeStartEnd.appendChild(timeEnd);

    planType.appendChild(timeStartEnd);

    var planPlaceUrgency = document.createElement('div');
    planPlaceUrgency.className = "planPlaceUrgency addMargin";

    var place = document.createElement('input');
    place.className = "data";
    place.placeholder = "Place";
    place.id = "placeEvent";
    if (placeValue != null) {
        place.value = placeValue;
    }
    if (typeValue == "event") {
        place.disabled = "";
    }
    else {
        place.disabled = "disabled";
    }
    planPlaceUrgency.appendChild(place);

    var urgencyBlock = document.createElement('div');
    urgencyBlock.className = "urgencyBlock";

    var p = document.createElement('p');
    var text = document.createTextNode("Urgency");
    p.appendChild(text);
    urgencyBlock.appendChild(p);

    var urgency = document.createElement('input');
    urgency.className = "urgencyTask";
    urgency.id = "urgencyTask";
    urgency.type = "range";
    urgency.min = "1";
    urgency.max = "4";
    if (urgencyValue == null) {
        urgency.value = "2";
    }
    else {
        urgency.value = urgencyValue;
    }
    if (typeValue == "task") {
        urgency.disabled = "";
    }
    else {
        urgency.disabled = "disabled";
    }

    urgencyBlock.appendChild(urgency);

    planPlaceUrgency.appendChild(urgencyBlock);

    planType.appendChild(planPlaceUrgency);

    planForm.appendChild(planType);

    var create = document.createElement('input');
    create.className = "button create";
    create.type = "button";
    if (editID == null) {
        create.value = "Create plan";
    }
    else {
        create.value = "Edit plan";
    }
    create.onclick = function () {
        if (editID == null) {
            db.get("SELECT id_user FROM users where name = ?", [userName], (err, row) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var p_id_user = row.id_user;
                    db.get("SELECT max(id_plan) max_id FROM plans", [], (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        var p_id_plan = row.max_id + 1;
                        var p_name = document.getElementById('planName').value;
                        var p_description = document.getElementById('planDescription').value;
                        var p_date = new Date(document.getElementById('planDate').value);
                        p_date = p_date.getDate() + '/' + (p_date.getMonth() + 1) + "/" + p_date.getFullYear();
                        var p_id_category = document.getElementById('planCategory').value;
    
                        if (document.getElementById('planType').value == "event") {
                            var p_time_start = document.getElementById('timeStart').value;
                            var p_time_end = document.getElementById('timeEnd').value;
                            var p_place = document.getElementById('placeEvent').value;
    
                            db.get("SELECT count(*) number FROM plans natural join events where id_user = ? and date = ? and time_start = ?", [p_id_user, p_date, p_time_start], (err, row) => {
                                if (err) {
                                    console.log(err);
                                }
                                else if (row.number == 0) {
                                    db.run("INSERT INTO plans(id_plan, id_user, name, description, date, id_category) VALUES(?, ?, ?, ?, ?, ?)", [p_id_plan, p_id_user, p_name, p_description, p_date, p_id_category], (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                    db.run("INSERT INTO events(id_plan, time_start, time_end, place) VALUES (?, ?, ?, ?)", [p_id_plan, p_time_start, p_time_end, p_place], (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                    alert('Plan added successfully!');
                                    showWeek();
                                }
                            });
                        }
                        else if (document.getElementById('planType').value == "task") {
                            var p_urgency = document.getElementById('urgencyTask').value;
                            db.get("SELECT count(*) number FROM plans natural join tasks where id_user = ? and name = ? and date = ? and id_category = ? and urgency = ?", [p_id_user, p_name, p_date, p_id_category, p_urgency], (err, row) => {
                                if (err) {
                                    console.log(err);
                                }
                                else if (row.number == 0) {
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
                                    alert('Plan added successfully!');
                                    showWeek();
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            var p_name = document.getElementById('planName').value;
            var p_description = document.getElementById('planDescription').value;
            var p_date = new Date(document.getElementById('planDate').value);
            p_date = p_date.getDate() + '/' + (p_date.getMonth() + 1) + "/" + p_date.getFullYear();
            var p_id_category = document.getElementById('planCategory').value;

            db.run("UPDATE plans SET name = ?, description = ?, date = ?, id_category = ? WHERE id_plan = ?", [p_name, p_description, p_date, p_id_category, editID], (err) => {
                if (err) {
                    console.log(err);
                }
                if (typeValue == "task") {
                    var p_urgency = document.getElementById('urgencyTask').value;

                    db.run("UPDATE tasks SET urgency = ? WHERE id_plan = ?", [p_urgency, editID], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                else if (typeValue == "event") {
                    var p_time_start = document.getElementById('timeStart').value;
                    var p_time_end = document.getElementById('timeEnd').value;
                    var p_place = document.getElementById('placeEvent').value;

                    db.run("UPDATE events SET time_start = ?, time_end = ?, place = ? WHERE id_plan = ?", [p_time_start, p_time_end, p_place, editID], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }

                editID = null;
                nameValue = null;
                planDateValue = null;
                descriptionValue = null;
                typeValue = null;
                categoryValue = null;
                urgencyValue = null;
                timeStartValue = null;
                timeEndValue = null;
                placeValue = null;

                alert('Plan edited successfully!');
                showWeek();
            });
        }
    };

    planForm.appendChild(create);
    parent.appendChild(planForm);
};
