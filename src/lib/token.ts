import Cookies from "js-cookie";

// Save tokens
export const setTokens = (accessToken: string) => {
  Cookies.set("client.hint", accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

// Get token
export const getAccessToken = () => Cookies.get("client.hint");

// Clear tokens
export const clearTokens = () => {
  Cookies.remove("client.hint");
};

// Save Id
export const setId = (id: string) => {
  Cookies.set("cld.ast", `cldAst${id}`, {
    secure: true,
    sameSite: "strict",
    expires: 7
  })
}

// Get UserId
export const getId = () => {
  const original = Cookies.get("cld.ast");
  if (original) {
    const userId = original.slice(6);
    return userId
  } else {
    return null
  }
}

// Delete UserId
export const deleteId = () => {
  Cookies.remove("cld.ast")
}


//Save Admin Token
export const setAdminTokens = (accessToken: string) => {
  Cookies.set("node.idx", accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

// Get admin token
export const getAdminAccessToken = () => Cookies.get("node.idx");

// Clear tokens
export const clearAdminTokens = () => {
  Cookies.remove("node.idx");
};

// Save Passcode Access
export const setPasscodeAccess = (passcode: string) => {
  Cookies.set("cfg.pkt", passcode, {
    secure: true,
    sameSite: "strict",
    expires: 1,
  })
};

// Get Passcode Access
export const getPasscodeAccess = () => Cookies.get("cfg.pkt");

// Clear Passcode
export const clearPasscodeAccess = () => {
  Cookies.remove("cfg.pkt")
}