import Supplier from "../Model/Supplier.js"

//Add Supplier API
export const AddSupplier = async (req, res, next) => {
    console.log(req.body);
    const data = await Supplier.findOne({ contact: req.body.contact });
    if (data)
        return res.status(201).json({ message: "Supplier already exist", data });
    else
        await Supplier.create(req.body)
            .then((supplier) => {
                return res.status(201).json({ message: "Supplier account created successfully", supplier });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: "Error creating user" });
            });
};

//Remove Supplier API
export const removeSupplier = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    try {
        const supplier = await Supplier.findOneAndDelete({ _id: id });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting supplier" });
    }
};


//Find particular user
export const findByEmail = async (req, res, next) => {
    try {
        const user = await Supplier.findOne({ email: req.body.email });
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Something went wrong" });
    }
};

// Update particular detail
export const updateUser = async (req, res) => {
    const { name, contact, productCategory, userId } = req.body;
    try {
        const user = await Supplier.findByIdAndUpdate(userId, { name, contact, productCategory }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};

//update Password
export const updatePassword = async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log(email, password, newPassword);
        const user = await Supplier.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized Supplier..." });
        }
        const isPasswordCorrect = await user.checkPass(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password does not match" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const ViewAllSupplier = (req, res, next) => {
    Supplier.find().then((supplier) => {
        return res.status(200).json({ message: "All Supplier..", supplier });
    }
    ).catch(err => {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    });
}