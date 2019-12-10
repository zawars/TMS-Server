/**
 * NotificationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {
  socket.on('postNotification', async data => {
    if (data.module == 'claims') {
      let claim = await Claims.findOne({
        id: data.moduleItemId
      }).populateAll();

      let organisation = await Organisation.findOne({
        id: claim.customer.organisation
      }).populateAll();

      let notificationsList = [];
      if (organisation.users.length > 0) {
        organisation.users.forEach(user => {
          if (user.roles.includes('Claim Manager')) {
            notificationsList.push({
              ...data,
              owner: user.id
            });
          }
        });
      }

      if (notificationsList.length > 0) {
        await Notifications.createEach(notificationsList);
        let ids = [];
        notificationsList.map(val => ids.push(val._id.toString()));

        notificationsList = await Notifications.find({
          id: ids
        }).populateAll();

        notificationsList.forEach((notifObj, idx) => {
          RedisService.get(`socket-${notifObj.owner.id}`, result => {
            if (result != undefined) {
              notificationsList[idx].socketId = result;
            }

            if (idx == notificationsList.length - 1) {
              notificationsList.map(obj => {
                io.to(obj.socketId).emit('notification', obj)
              });
            }
          });
        });
      }
    }
  });

  socket.on('fetchNotifications', data => {

  });
});

module.exports = {


};
