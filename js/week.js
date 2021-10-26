function showWeek() {
    display = showWeek;
    var tempDate1 = new Date(tempDate);
    if (tempDate.getDay() == 0) {
        tempDate1.setDate(tempDate.getDate() - 6);
    }
    else {
        tempDate1.setDate(tempDate.getDate() - tempDate.getDay() + 1);
    }
    rebuildContent(buildWeek, tempDate1);
}

function buildWeek(currentDate) {
    document.getElementById('choosen').innerHTML = month[currentDate.getMonth()] + ", " + currentDate.getFullYear();

    var newElement = document.createElement('div');
    newElement.className = "dayOfWeek";
    newElement.value = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();

    newElement.onclick = function () {
        showDay(this.value);
    };

    var head = document.createElement('div');
    head.className = "headWeek";

    var text = document.createElement("div");
    text.className = "dateWeek";
    var textvalue = document.createTextNode(currentDate.getDate());
    text.appendChild(textvalue);
    head.appendChild(text);

    text = document.createElement("div");
    text.className = "dayWeek";
    textvalue = document.createTextNode(day[currentDate.getDay()]);
    text.appendChild(textvalue);
    head.appendChild(text);

    newElement.appendChild(head);

    let date = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

    if (category) {
        var query = "SELECT count(*) number FROM events where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?) and id_category = (SELECT id_category FROM category where name = ?))";
    }
    else {
        var query = "SELECT count(*) number FROM events where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?))";
    }

    db.get(query, [date, userName, category], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        else if (row.number > 0) {
            var plan = document.createElement("div");
            plan.className = "planWeek";
            var planNumber = document.createElement("div");
            planNumber.className = "planNumberWeek event";
            var planName = document.createElement("div");
            planName.className = "planNameWeek";

            textvalue = document.createTextNode(row.number);
            planNumber.appendChild(textvalue);
            plan.appendChild(planNumber);

            textvalue = document.createTextNode("event(s)");
            planName.appendChild(textvalue);
            plan.appendChild(planName);

            newElement.appendChild(plan);
        }

        if (category) {
            query = "SELECT count(*) number, max(urgency) maxUrgency FROM tasks where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?) and id_category = (SELECT id_category FROM category where name = ?))";
        }
        else {
            query = "SELECT count(*) number, max(urgency) maxUrgency FROM tasks where id_plan in (SELECT id_plan FROM plans where  date = ? and id_user = (SELECT id_user FROM users where name = ?))";
        }

        db.get(query, [date, userName, category], (err, row) => {
            if (err) {
                console.log(err.message);
            }
            else if (row.number > 0) {
                plan = document.createElement("div");
                plan.className = "planWeek";
                planNumber = document.createElement("div");
                planNumber.className = "planNumberWeek task";
                planName = document.createElement("div");
                planName.className = "planNameWeek";

                textvalue = document.createTextNode(row.number);
                planNumber.appendChild(textvalue);
                plan.appendChild(planNumber);

                textvalue = document.createTextNode("task(s)");
                planName.appendChild(textvalue);
                plan.appendChild(planName);

                newElement.appendChild(plan);
            }

            plan = document.createElement("div");
            plan.className = "urgencyWeek";

            var image = document.createElement("img");
            image.className = "imageWeek";

            if (row.maxUrgency > 0) {
                image.src = "../img/" + row.maxUrgency + ".png";
                plan.appendChild(image);
            }

            newElement.appendChild(plan);
            parent.appendChild(newElement);

            currentDate.setDate(currentDate.getDate() + 1);

            if (currentDate.getDay() != 1) {
                buildWeek(currentDate);
            }
        });
    });
};
