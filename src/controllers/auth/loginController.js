import { Createtoken } from '../../services/tokenService.js'
import bcrypt from 'bcrypt'
//import { Customer } from '../../models/CustomerModel.js'
import { Admin } from '../../models/AdminModel.js'

export const Login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body
    //const resdata = await Customer.findOne({ Email, Status: 'Active' })
    const resdata1 = await Admin.findOne({ Email, Status: 'Active' })
    if (resdata1) {
        // const verifypassword = await bcrypt.compare(Password, resdata1.Password)
        // if (verifypassword === true) {
        const token = Createtoken({ _id: resdata1._id,  Email: resdata1.Email, Role: resdata1.Role })
        res.send({ status: 'Success', token, Role: resdata1.Role })
      // } else {
      //   res.send({ status: 'Invalid email or password' })
      // }
    // } else if (resdata) {
    //   const verifypassword = await bcrypt.compare(Password, resdata.Password)
    //   if (verifypassword === true) {
    //     const token = Createtoken({ _id: resdata._id, First_Name: resdata.First_Name, Email: resdata.Email, Role: resdata.Role })
    //     res.send({ status: 'Success', token, Role: resdata.Role })
    //    } else {
    //      res.send({ status: 'Invalid email or password' })
    //    }
    } else {
      res.send({ status: 'Invalid email or password' })
    }
  } catch (err) {
    console.error(err)
  }
}
