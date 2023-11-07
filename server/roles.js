import AccessControl from "accesscontrol";
const ac = new AccessControl();

const roles = () => {
  ac.grant("client").updateOwn("profile").readOwn("profile");

  ac.grant("artist").extend("client");

  ac.grant("admin")
    .extend("client")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
};

export default roles();
