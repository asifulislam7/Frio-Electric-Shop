let orders = [
    {
        delivery_id: "DEL-101",
        order_id: "ORD-501",
        customer: "Tanvir Ahmed",
        phone: "01711-000000",
        address: "Dhanmondi, Dhaka",
        date: "2026-11-18",
        status: "Pending",
        items: "1x Ceiling Fan, 2x LED Light",
        total: "4,250 BDT"
    },
    {
        delivery_id: "DEL-102",
        order_id: "ORD-502",
        customer: "Nusrat Jahan",
        phone: "01811-111111",
        address: "Uttara, Dhaka",
        date: "2026-11-18",
        status: "Out for Delivery",
        items: "2x Multi-Socket, 1x Switch Board",
        total: "1,890 BDT"
    },
    {
        delivery_id: "DEL-103",
        order_id: "ORD-503",
        customer: "Mahmudul Hasan",
        phone: "01911-222222",
        address: "Mirpur, Dhaka",
        date: "2026-11-17",
        status: "Delivered",
        items: "1x Electric Cable Coil, 3x Breaker",
        total: "6,500 BDT"
    }
];

function displayOrders() {
    let tableBody = document.getElementById("order-table-body");
    let searchLocation = document.getElementById("search-location").value.toLowerCase();
    let filterStatus = document.getElementById("filter-status").value;

    tableBody.innerHTML = "";

    let total = orders.length;
    let pending = 0;
    let transit = 0;
    let delivered = 0;

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];

        if (order.status === "Pending") pending++;
        if (order.status === "Out for Delivery") transit++;
        if (order.status === "Delivered") delivered++;

        let matchLocation = order.address.toLowerCase().includes(searchLocation);
        let matchStatus = (filterStatus === "All" || order.status === filterStatus);

        if (matchLocation && matchStatus) {
            let row = `<tr>
                <td>${order.delivery_id}</td>
                <td>${order.order_id}</td>
                <td>${order.customer}</td>
                <td>${order.address}</td>
                <td>${order.date}</td>
                <td><b>${order.status}</b></td>
                <td>
                    <select onchange="changeStatus(${i}, this.value)">
                        <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Out for Delivery" ${order.status === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
                        <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                    </select>
                </td>
                <td>
                    <button class="view-btn" onclick="showDetails(${i})">View Details</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        }
    }

    document.getElementById("total-count").innerText = total;
    document.getElementById("pending-count").innerText = pending;
    document.getElementById("transit-count").innerText = transit;
    document.getElementById("delivered-count").innerText = delivered;
}

function changeStatus(index, newStatus) {
    orders[index].status = newStatus;
    alert("Status updated to: " + newStatus);
    displayOrders();
}

function showDetails(index) {
    let order = orders[index];
    let detailsHtml = `
        <p><b>Order ID:</b> ${order.order_id}</p>
        <p><b>Customer:</b> ${order.customer}</p>
        <p><b>Phone:</b> ${order.phone}</p>
        <p><b>Address:</b> ${order.address}</p>
        <p><b>Products:</b> ${order.items}</p>
        <p><b>Total Price:</b> ${order.total}</p>
        <p><b>Status:</b> ${order.status}</p>
    `;
    document.getElementById("modal-text").innerHTML = detailsHtml;
    document.getElementById("details-box").style.display = "block";
}

function closeDetails() {
    document.getElementById("details-box").style.display = "none";
}

function logout() {
    alert("Logged out successfully!");
}

displayOrders();