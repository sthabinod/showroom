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



const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const MaintenanceRequest = require("./routes/MaintenanceRequest");
app.use("/maintenance-request", MaintenanceRequest);

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