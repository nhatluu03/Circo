import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";
import Artwork from "../models/artwork.model.js";
import Commission from "../models/commission.model.js";

class OrderController {
  index = async (req, res, next) => {
    try {
      const orders = await Order.find();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      next(error)
    }
  };
  
  // Show - Get a specific order by ID
  show = async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
  
      res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error)
    }
  };
  
  // Store - Create a new order
  store = async (req, res, next) => {
    // console.log(req.body);
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
      next(error)
    }
  };
  
  // Update - Update an existing order
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
  
      res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
      next(error)
    }
  };
  
  // Destroy - Delete an order
  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
  
      res.status(200).json({ success: true, data: deletedOrder });
    } catch (error) {
      next(error)
    }
  };

  getOrdersByClientId = async (req, res, next) => {
    try {
      const orders = await Order.find({ client: req.params.clientId }).populate({
        path: 'items.itemId',
        model: 'Artwork',
        select: 'title price images forSelling', // Include 'forSelling' field to filter only selling artworks
      })
      .sort({ createdAt: -1 })
      .exec();
  
      // Modify the response to include titles of each item
      const modifiedOrders = orders.map(order => {
        const modifiedItems = order.items.map(item => {
          return {
            ...item._doc,
            title: item.itemId.title, // Add the title field to each item
          };
        });
  
        return {
          ...order._doc,
          items: modifiedItems,
        };
      });
  
      res.status(200).json(modifiedOrders);
    } catch (error) {
      next(error);
    }
  };
  

  getOrdersByTalentId = async (req, res, next) => {
    try {
      const talentId = req.params.talentId; // Get ownerId from request parameters
  
      // Find orders where items.itemId belongs to the specified artwork owner
      const ownerOrders = await Order.find({
        'items.itemId': { $in: await Artwork.find({ talent: talentId }).distinct('_id') },
      })
        .populate('client', 'username') // Populate the 'client' field with the client's username
        .populate('items.itemId') // Populate the 'items.itemId' field with the actual item details
        .sort({ createdAt: -1 });
        
      res.status(200).json(ownerOrders);
    } catch (error) {
      next(error)
    }
  }

  getReviews = async (req, res, next) => {
    try {
      const orders = await Order.find({client: req.params.clientId}).populate({
        path: 'items.itemId',
        model: 'Artwork', // Adjust this based on your actual model name
        select: 'title price images', // Select the fields you want to retrieve
      })
      .exec();;
      res.status(200).json(orders);
    } catch (error) {
      next(error)
    }
  }; 

  intent = async (req, res, next) => {
    //Find the artwork/commission, client in the database
    const typeOfOrder = req.body.type
    const itemsOfOrder = req.body.items
    const client = await User.findById(req.userId);

    //Stripe Integration
    const stripe = new Stripe(process.env.STRIPE);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "aud",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  };

  // index = async (req, res, next) => {
  //   try {
  //     const orders = await Order.find();
  //     res.status(200).json(orders);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // // store = async (req, res, next) => {
  // //   try {
  // //     //Find the artwork/commission, client in the database
  // //     const commission = await Commission.findById(req.params.id);
  // //     const artwork = await Artwork.findById(req.params.id);
  // //     const client = await User.findById(req.userId);
  // //     //Define the orderData
  // //     let orderData = {
  // //       client: client._id,
  // //       ...req.body,
  // //     };

  // //     //Check whether the type is artwork or commission
  // //     if (artwork) {
  // //       orderData.type = {
  // //         artwork: new mongoose.Types.ObjectId(req.params.id),
  // //       };
  // //       orderData.price = artwork.price;
  // //       orderData.talent = artwork.talent;
  // //     } else if (commission) {
  // //       orderData.type = {
  // //         commission: new mongoose.Types.ObjectId(req.params.id),
  // //       };
  // //       orderData.price = commission.price;
  // //       orderData.talent = commission.talent;
  // //     } else {
  // //       res.status(404).json({
  // //         error: "Invalid type",
  // //       });
  // //     }
  // //     const order = new Order(orderData);
  // //     //Save the order to the database
  // //     await order.save();
  // //     res.status(200).json(order);
  // //   } catch (error) {
  // //     next(error);
  // //   }
  // // };

  // show = async (req, res, next) => {
  //   //Check if the order exists
  //   const order = await Order.findById(req.params.id)
  //   if (!order) {
  //     return res.status(404).json({
  //       error: "Order not found",
  //     });
  //   }
  //   try {
  //     if (order.type == 'artwork') {
  //       await Promise.all(order.items.map(async (itemId) => {
  //         try {
  //           // Dynamically fetch the referenced document using populate
  //           await order.populate({
  //             path: 'items',
  //             match: { _id: itemId }, // Match the specific item in the array
  //             select: 'talent', // Select the fields you want to populate
  //           }).execPopulate();
  //         } catch (error) {
  //           console.error(`Error populating item with ID ${itemId}: ${error.message}`);
  //         }
  //       }));
  //     }else if(order.type == 'commission'){
  //       await order.populate({
  //         path:'items',
  //         select:'talent'
  //       })
  //     }else{
  //       res.status(400).json({
  //         error: 'Invalid items'
  //       })
  //     }
  //     res.status(200).json(order);
  //   } catch (error) {
  //     res.status(400).json({
  //       error: "Internal server error"
  //     })
  //   }
  // };

  // update = async (req, res, next) => {
  //   const order = await Order.findById(req.params.id);
  //   const user = await User.findById(req.userId);
  //   //Check if the order exists
  //   if (!order)
  //     return res.status(404).json({
  //       error: "Order not found",
  //     });
  //   //Check if the client is the owner of the order
  //   if (order.client.toString() !== user._id.toString())
  //     return res.status(404).json({
  //       error: "You do not have permission to update this order",
  //     });

  //   try {
  //     const updatedOrder = await Order.findByIdAndUpdate(
  //       req.params.id,
  //       { $set: req.body },
  //       { new: true }
  //     );
  //     res.status(200).json(updatedOrder);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // destroy = async (req, res, next) => {
  //   //Check if the order exists
  //   const order = await Order.findById(req.params.id);
  //   if (!order)
  //     return res.status(404).json({
  //       error: "Order not found",
  //     });

  //   try {
  //     await Order.findByIdAndDelete(req.params.id);
  //     res.status(200).json("Deleting an order");
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default new OrderController();
