import React from "react";

const GoogleLogin = () => {
  //   const [accessToken, setAccessToken] = useState();
  //   const [info, setInfo] = useState();
  //   const [refreshToken, setRefreshToken] = useState();
  //   useEffect(() => {
  //     console.log("useEffect...");
  //     const url = new URL(window.location.href);
  //     const authorizationCode = url.searchParams.get("code");

  //     if (authorizationCode) {
  //       getAccessToken(authorizationCode);
  //     }
  //     return () => {};
  //   }, []);

  //   useEffect(() => {
  //     getUserInfo(accessToken);
  //     return () => {};
  //   }, [accessToken]);

  //   const getUserInfo = async (accessToken) => {
  //     axios
  //       .get(`http://localhost:8080/receive/userinfo?accessToken=${accessToken}`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setInfo(res.data);
  //       });
  //   };

  //   const getAccessToken = async (authorizationCode) => {
  //     axios
  //       .post(`http://localhost:5000/receive/token`, { authorizationCode })
  //       .then((res) => {
  //         console.log(res.data);
  //         if (!refreshToken) {
  //           setRefreshToken(res.data.refreshToken);
  //         }
  //         setAccessToken(res.data.access_token);
  //       });
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://pickmeup-client.s3-website.ap-northeast-2.amazonaws.com/&client_id=420966848981-vbm3afu0qafe2j3jeuf5psdm7iqphhqq.apps.googleusercontent.com">
        Google
      </a>
    </div>
  );
};

//최초 1회 로그인할 때 리프레시 토큰이 주어짐.

export default GoogleLogin;
