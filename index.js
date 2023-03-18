const express = require("express");
const app = express();
// to directly parse the post request as JSON format
app.use(express.json());
const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const cors = require("cors");

const db = require("./models");

app.use(cors());

// Routers

const customerRouter = require("./routes/Customer");
app.use("/customer", customerRouter);

// const exchangedTransactionRouter = require("./routes/ExchangedTransaction");
// app.use("/exchanged-transaction", exchangedTransactionRouter);

const categoryRouter = require("./routes/Categories");
app.use("/category", categoryRouter);

const vehicleParts = require("./routes/VehicleParts");
app.use("/vehicle-parts", vehicleParts);

const vehicleRouter = require("./routes/Vehicle");
app.use("/vehicle", vehicleRouter);

const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const partsOrder = require("./routes/PartsOrder");
app.use("/parts_order", partsOrder);

const vehicleOrder = require("./routes/VehicleOrder");
app.use("/vehicle-order", vehicleOrder);

const companyRouter = require("./routes/Company");
app.use("/company", companyRouter);

const exchangedVehicleouter = require("./routes/ExchangedVehicle");
app.use("/exchangedVechicle", exchangedVehicleouter);

const userRouter = require("./routes/User");
app.use("/users", userRouter);

const AdminBroSequelize = require("@admin-bro/sequelize");
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    rootPath: "/admin",
    loginPath: "/admin/login",
    databases: [db],
    branding: {
        companyName: "Dharan Showroom System ",
        softwareBrothers: true,
    },
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("RUNNING");
    });
});