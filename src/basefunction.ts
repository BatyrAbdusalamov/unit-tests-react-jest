class Cookie {
    getCookie(name:string) {
        const matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    setCookie(name:string, value:string, options = {}) {
    
        options = {
          path: '/',
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          const optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
    }
    
    deleteCookie(name:string) {
        this.setCookie(name, "", {
          'max-age': -1
        })
    }
    
    getJWT(){
        return this.getCookie('access_token')
    }

    LogIn(access_token:string, refresh_token:string){
        this.setCookie('access_token', access_token, {
            'max-age': 3600
          } );
        this.setCookie('refresh_token', refresh_token, {
          'max-age': 864000
        } )
    }

    LogOut(){
      this.setCookie('access_token', '', {
        'max-age': -1
      } );
      this.setCookie('refresh_token', '', {
        'max-age': -1
      } );
    }

    getRefreshToken():string {
        return this.getCookie('refresh_token') ?? ''
    }

    setAccessToken(access_token:string){
      this.setCookie('access_token', access_token, {
        'max-age': 3600
      } );
    }
}
const cooks = new Cookie()
export default cooks