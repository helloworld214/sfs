/**
 * Created by Administrator on 2017/7/28/0028.
 */
navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE','')) < 9 ? window.location = 'oldbrowse/oldbrowse.html' : void(0);