export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJEJ8tI7yP5R+nYfnj/KfxuaRLxrU+Vs
v0FR1TKHXGFnV8QXFlSh0Iq97O8hJgNHE0ypViWPqWRNDgkKBSonG9ECAwEAAQ==
-----END PUBLIC KEY-----`,

  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAJEJ8tI7yP5R+nYfnj/KfxuaRLxrU+Vsv0FR1TKHXGFnV8QXFlSh
0Iq97O8hJgNHE0ypViWPqWRNDgkKBSonG9ECAwEAAQJAex/57fTozNUlDTAMNFUg
EHumzFlEkGf/+GCS32E/0EMUViWj5DjVXlF3UMNfz0CYhvrJvqoTK0wbXM4eSdlY
bQIhANgKlVJLlJg0JOOhz1Z4M1ew1H1cO0fWCSNiNsLFz8dnAiEAq91xsC96t6P1
J2KTMI1X/cdyZDnNjj41Yd2bhsmhGAcCIG8qyvlk0NqdAlprud/5zBmUcVLsccie
N2eQszL4TNmDAiB3ftWwOaLqkl4/DyPmCzCV7BnWI/aPIyO8sveTJRgT+wIgLOO8
shYZiHqFIiJru2lOb4x/gZEGvJyB0zKuqBemjLE=
-----END RSA PRIVATE KEY-----`,
};
