import sql from "../database.mjs";

export const isAdmin = async (req, res, next) => {
  const is_admin =
    await sql`select isadmin from register where id=${req.body.id}`;

  if (!is_admin[0].isadmin) {
    return res.status(200).json({
      success: false,
      message: "you are not authorized",
    });
  }

  next();
};
