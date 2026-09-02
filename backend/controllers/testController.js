const testController = (req, res) => {
    res.json({
        message: "Backend API is working!",
        status: "success"
    });
};

module.exports = testController;
