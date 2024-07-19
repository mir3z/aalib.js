find ./dev -name '*' -type f -exec curl -T {} -u $(grep USER .env | cut -d '=' -f2):$(grep PW .env | cut -d '=' -f2) ftp://ftp3.ftptoyoursite.com/web/content/aalib/dev/ \;
