import { FilterQuery, UpdateQuery } from "mongoose";
import sessionModel, { sessionDocument } from "../models/session.model";
import { verifyJwt, signInJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });
  return session;
}

export async function findSessions(query: FilterQuery<sessionDocument>) {
  return await sessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<sessionDocument>,
  update: UpdateQuery<sessionDocument>
) {
  return await sessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) {
    return false;
  }

  const session = await sessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  //create an access token
  const accessToken = signInJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") } // 15minumtes}
  );

  return accessToken;
}
