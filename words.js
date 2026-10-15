(function () {
  "use strict";

  const raw = {
    초등: {
      noun: `
apple|ˈæpəl|사과
book|bʊk|책
boy|bɔɪ|소년
girl|ɡɝːl|소녀
school|skuːl|학교
teacher|ˈtiːtʃər|선생님
student|ˈstuːdənt|학생
friend|frend|친구
family|ˈfæməli|가족
mother|ˈmʌðər|어머니
father|ˈfɑːðər|아버지
sister|ˈsɪstər|자매
brother|ˈbrʌðər|형제
house|haʊs|집
room|ruːm|방
door|dɔːr|문
window|ˈwɪndoʊ|창문
table|ˈteɪbəl|탁자
chair|tʃer|의자
bed|bed|침대
water|ˈwɔːtər|물
milk|mɪlk|우유
bread|bred|빵
rice|raɪs|쌀, 밥
egg|eɡ|달걀
food|fuːd|음식
cat|kæt|고양이
dog|dɔːɡ|개
bird|bɝːd|새
fish|fɪʃ|물고기
horse|hɔːrs|말
tree|triː|나무
flower|ˈflaʊər|꽃
sun|sʌn|태양
moon|muːn|달
star|stɑːr|별
sky|skaɪ|하늘
rain|reɪn|비
snow|snoʊ|눈
wind|wɪnd|바람
day|deɪ|날, 하루
night|naɪt|밤
morning|ˈmɔːrnɪŋ|아침
time|taɪm|시간
year|jɪr|해, 년
name|neɪm|이름
hand|hænd|손
head|hed|머리
eye|aɪ|눈
face|feɪs|얼굴
foot|fʊt|발
mouth|maʊθ|입
leg|leɡ|다리
car|kɑːr|자동차
bus|bʌs|버스
train|treɪn|기차
bike|baɪk|자전거
ball|bɔːl|공
game|ɡeɪm|게임, 경기
music|ˈmjuːzɪk|음악
picture|ˈpɪktʃər|그림, 사진
toy|tɔɪ|장난감
box|bɑːks|상자
bag|bæɡ|가방
cup|kʌp|컵
clock|klɑːk|시계
park|pɑːrk|공원
city|ˈsɪti|도시
garden|ˈɡɑːrdən|정원
street|striːt|거리
aunt|ænt|이모, 고모, 숙모
uncle|ˈʌŋkəl|삼촌, 외삼촌
cousin|ˈkʌzən|사촌
baby|ˈbeɪbi|아기
child|tʃaɪld|아이
man|mæn|남자
woman|ˈwʊmən|여자
parent|ˈperənt|부모
son|sʌn|아들
daughter|ˈdɔːtər|딸
shirt|ʃɝːt|셔츠
pants|pænts|바지
dress|dres|원피스
skirt|skɝːt|치마
coat|koʊt|코트
jacket|ˈdʒækɪt|재킷
shoe|ʃuː|신발
sock|sɑːk|양말
hat|hæt|모자
cap|kæp|야구 모자
scarf|skɑːrf|목도리
glove|ɡlʌv|장갑
belt|belt|벨트
pocket|ˈpɑːkɪt|주머니
uniform|ˈjuːnəfɔːrm|교복, 제복
classroom|ˈklæsruːm|교실
desk|desk|책상
notebook|ˈnoʊtbʊk|공책
pencil|ˈpensəl|연필
pen|pen|펜
eraser|ɪˈreɪsər|지우개
ruler|ˈruːlər|자
paper|ˈpeɪpər|종이
lesson|ˈlesən|수업
homework|ˈhoʊmwɝːk|숙제
test|test|시험
subject|ˈsʌbdʒɪkt|과목
lunch|lʌntʃ|점심
sandwich|ˈsændwɪtʃ|샌드위치
breakfast|ˈbrekfəst|아침 식사
dinner|ˈdɪnər|저녁 식사
snack|snæk|간식
fruit|fruːt|과일
banana|bəˈnænə|바나나
orange|ˈɔːrɪndʒ|오렌지
grape|ɡreɪp|포도
lemon|ˈlemən|레몬
peach|piːtʃ|복숭아
pear|per|배
strawberry|ˈstrɔːberi|딸기
vegetable|ˈvedʒtəbəl|채소
potato|pəˈteɪtoʊ|감자
tomato|təˈmeɪtoʊ|토마토
carrot|ˈkærət|당근
onion|ˈʌnjən|양파
corn|kɔːrn|옥수수
bean|biːn|콩
cheese|tʃiːz|치즈
butter|ˈbʌtər|버터
soup|suːp|수프
salad|ˈsæləd|샐러드
cake|keɪk|케이크
cookie|ˈkʊki|쿠키
candy|ˈkændi|사탕
chocolate|ˈtʃɔːklət|초콜릿
juice|dʒuːs|주스
tea|tiː|차
coffee|ˈkɔːfi|커피
sugar|ˈʃʊɡər|설탕
salt|sɔːlt|소금
meat|miːt|고기
chicken|ˈtʃɪkɪn|닭고기
rabbit|ˈræbɪt|토끼
mouse|maʊs|생쥐
duck|dʌk|오리
sheep|ʃiːp|양
cow|kaʊ|소
pig|pɪɡ|돼지
goat|ɡoʊt|염소
bear|ber|곰
lion|ˈlaɪən|사자
tiger|ˈtaɪɡər|호랑이
monkey|ˈmʌŋki|원숭이
elephant|ˈeləfənt|코끼리
frog|frɔːɡ|개구리
turtle|ˈtɝːtəl|거북이
snake|sneɪk|뱀
bee|biː|벌
butterfly|ˈbʌtərflaɪ|나비
kitchen|ˈkɪtʃən|부엌
bathroom|ˈbæθruːm|욕실
`,
      verb: `
be|biː|이다, 있다
have|hæv|가지다
do|duː|하다
go|ɡoʊ|가다
come|kʌm|오다
see|siː|보다
look|lʊk|보다
like|laɪk|좋아하다
love|lʌv|사랑하다
want|wɑːnt|원하다
eat|iːt|먹다
drink|drɪŋk|마시다
make|meɪk|만들다
play|pleɪ|놀다, 경기하다
read|riːd|읽다
write|raɪt|쓰다
run|rʌn|달리다
walk|wɔːk|걷다
talk|tɔːk|말하다
say|seɪ|말하다
listen|ˈlɪsən|듣다
hear|hɪr|듣다
help|help|돕다
open|ˈoʊpən|열다
close|kloʊz|닫다
give|ɡɪv|주다
take|teɪk|가져가다
get|ɡet|얻다
know|noʊ|알다
think|θɪŋk|생각하다
learn|lɝːn|배우다
study|ˈstʌdi|공부하다
work|wɝːk|일하다
sleep|sliːp|자다
sit|sɪt|앉다
stand|stænd|서다
buy|baɪ|사다
find|faɪnd|찾다
live|lɪv|살다
call|kɔːl|부르다, 전화하다
cook|kʊk|요리하다
wash|wɑːʃ|씻다
brush|brʌʃ|솔질하다
smile|smaɪl|미소 짓다
laugh|læf|웃다
cry|kraɪ|울다
dance|dæns|춤추다
sing|sɪŋ|노래하다
jump|dʒʌmp|뛰다
swim|swɪm|수영하다
fly|flaɪ|날다
catch|kætʃ|잡다
throw|θroʊ|던지다
kick|kɪk|차다
pull|pʊl|당기다
push|pʊʃ|밀다
cut|kʌt|자르다
paint|peɪnt|칠하다, 그림을 그리다
fix|fɪks|고치다
bake|beɪk|굽다
boil|bɔɪl|끓이다
pick|pɪk|고르다, 따다
feed|fiːd|먹이를 주다
use|juːz|사용하다
ride|raɪd|타다
turn|tɝːn|돌다, 돌리다
stop|stɑːp|멈추다
wave|weɪv|손을 흔들다
point|pɔɪnt|가리키다
touch|tʌtʃ|만지다
count|kaʊnt|세다
check|tʃek|확인하다
cross|krɔːs|건너다
rest|rest|쉬다
hurry|ˈhɝːi|서두르다
smell|smel|냄새를 맡다
taste|teɪst|맛보다
save|seɪv|구하다, 아끼다
drop|drɑːp|떨어뜨리다
shout|ʃaʊt|외치다
`,
      adjective: `
good|ɡʊd|좋은
bad|bæd|나쁜
big|bɪɡ|큰
small|smɔːl|작은
long|lɔːŋ|긴
short|ʃɔːrt|짧은, 키가 작은
new|nuː|새로운
old|oʊld|오래된, 나이 든
young|jʌŋ|어린
happy|ˈhæpi|행복한
sad|sæd|슬픈
nice|naɪs|좋은, 친절한
kind|kaɪnd|친절한
funny|ˈfʌni|재미있는
easy|ˈiːzi|쉬운
hard|hɑːrd|어려운, 단단한
hot|hɑːt|더운
cold|koʊld|추운
warm|wɔːrm|따뜻한
cool|kuːl|시원한
fast|fæst|빠른
slow|sloʊ|느린
clean|kliːn|깨끗한
dirty|ˈdɝːti|더러운
beautiful|ˈbjuːtəfəl|아름다운
pretty|ˈprɪti|예쁜
strong|strɔːŋ|강한
weak|wiːk|약한
hungry|ˈhʌŋɡri|배고픈
tired|ˈtaɪərd|피곤한
tall|tɔːl|키가 큰
low|loʊ|낮은
large|lɑːrdʒ|큰
little|ˈlɪtəl|작은
full|fʊl|가득 찬
empty|ˈempti|빈
sleepy|ˈsliːpi|졸린
sick|sɪk|아픈
ill|ɪl|아픈
brave|breɪv|용감한
noisy|ˈnɔɪzi|시끄러운
dark|dɑːrk|어두운
light|laɪt|밝은
soft|sɔːft|부드러운
loud|laʊd|시끄러운
sweet|swiːt|달콤한
sour|ˈsaʊər|신
salty|ˈsɔːlti|짠
spicy|ˈspaɪsi|매운
fresh|freʃ|신선한
delicious|dɪˈlɪʃəs|맛있는
favorite|ˈfeɪvərɪt|가장 좋아하는
next|nekst|다음의
last|læst|마지막의, 지난
early|ˈɝːli|이른
late|leɪt|늦은
right|raɪt|맞는, 오른쪽의
wrong|rɔːŋ|틀린
messy|ˈmesi|어질러진
`
    },
    중등: {
      noun: `
animal|ˈænəməl|동물
country|ˈkʌntri|나라
language|ˈlæŋɡwɪdʒ|언어
world|wɝːld|세계
people|ˈpiːpəl|사람들
person|ˈpɝːsən|사람
place|pleɪs|장소
problem|ˈprɑːbləm|문제
question|ˈkwestʃən|질문
answer|ˈænsər|대답, 답
idea|aɪˈdiːə|생각, 아이디어
story|ˈstɔːri|이야기
word|wɝːd|단어
letter|ˈletər|편지, 글자
number|ˈnʌmbər|숫자
example|ɪɡˈzæmpəl|예, 사례
reason|ˈriːzən|이유
result|rɪˈzʌlt|결과
change|tʃeɪndʒ|변화
minute|ˈmɪnɪt|분
hour|ˈaʊər|시간
week|wiːk|주
month|mʌnθ|달, 월
holiday|ˈhɑːlədeɪ|휴일
weather|ˈweðər|날씨
season|ˈsiːzən|계절
spring|sprɪŋ|봄
summer|ˈsʌmər|여름
autumn|ˈɔːtəm|가을
winter|ˈwɪntər|겨울
river|ˈrɪvər|강
mountain|ˈmaʊntən|산
beach|biːtʃ|해변
forest|ˈfɔːrɪst|숲
island|ˈaɪlənd|섬
ocean|ˈoʊʃən|대양
earth|ɝːθ|지구
plant|plænt|식물
health|helθ|건강
hospital|ˈhɑːspɪtəl|병원
doctor|ˈdɑːktər|의사
medicine|ˈmedəsən|약
computer|kəmˈpjuːtər|컴퓨터
internet|ˈɪntərnet|인터넷
email|ˈiːmeɪl|이메일
phone|foʊn|전화기
office|ˈɔːfɪs|사무실
store|stɔːr|가게
market|ˈmɑːrkɪt|시장
money|ˈmʌni|돈
price|praɪs|가격
job|dʒɑːb|직업, 일
vacation|veɪˈkeɪʃən|휴가
festival|ˈfestəvəl|축제
museum|mjuˈziːəm|박물관
library|ˈlaɪbreri|도서관
science|ˈsaɪəns|과학
history|ˈhɪstəri|역사
art|ɑːrt|예술
energy|ˈenərdʒi|에너지
accident|ˈæksədənt|사고
activity|ækˈtɪvəti|활동
actor|ˈæktər|배우
address|ˈædres|주소
advertisement|ˌædvərˈtaɪzmənt|광고
advice|ədˈvaɪs|조언
airport|ˈerˌpɔːrt|공항
album|ˈælbəm|앨범
author|ˈɔːθər|작가
background|ˈbækɡraʊnd|배경
building|ˈbɪldɪŋ|건물
business|ˈbɪznəs|사업
capital|ˈkæpɪtəl|수도, 자본
career|kəˈrɪr|직업, 경력
century|ˈsentʃəri|세기
character|ˈkærəktər|성격, 등장인물
college|ˈkɑːlɪdʒ|대학
concert|ˈkɑːnsərt|음악회
customer|ˈkʌstəmər|손님, 고객
deadline|ˈdedlaɪn|마감일
department|dɪˈpɑːrtmənt|부서
direction|dəˈrekʃən|방향
discussion|dɪˈskʌʃən|토론
distance|ˈdɪstəns|거리
driver|ˈdraɪvər|운전자
entrance|ˈentrəns|입구
event|ɪˈvent|행사
exercise|ˈeksərsaɪz|운동, 연습
factory|ˈfæktəri|공장
flight|flaɪt|비행
guest|ɡest|손님
guide|ɡaɪd|안내자, 안내서
habit|ˈhæbɪt|습관
information|ˌɪnfərˈmeɪʃən|정보
machine|məˈʃiːn|기계
meal|miːl|식사
neighbor|ˈneɪbər|이웃
news|nuːz|뉴스
novel|ˈnɑːvəl|소설
passenger|ˈpæsəndʒər|승객
permission|pərˈmɪʃən|허락
postcard|ˈpoʊstkɑːrd|엽서
product|ˈprɑːdʌkt|제품
program|ˈproʊɡræm|프로그램
project|ˈprɑːdʒekt|과제, 프로젝트
report|rɪˈpɔːrt|보고서
skill|skɪl|기술, 능력
sport|spɔːrt|운동, 스포츠
traffic|ˈtræfɪk|교통
village|ˈvɪlɪdʒ|마을
website|ˈwebsaɪt|웹사이트
invention|ɪnˈvenʃən|발명품
journey|ˈdʒɝːni|여정
map|mæp|지도
appointment|əˈpɔɪntmənt|약속
atmosphere|ˈætməsfɪr|분위기
basket|ˈbæskɪt|바구니
bicycle|ˈbaɪsɪkəl|자전거
bridge|brɪdʒ|다리
custom|ˈkʌstəm|관습
`,
      verb: `
ask|æsk|묻다
begin|bɪˈɡɪn|시작하다
believe|bɪˈliːv|믿다
bring|brɪŋ|가져오다
build|bɪld|짓다, 만들다
carry|ˈkæri|나르다
choose|tʃuːz|선택하다
climb|klaɪm|오르다
decide|dɪˈsaɪd|결정하다
draw|drɔː|그리다
drive|draɪv|운전하다
enjoy|ɪnˈdʒɔɪ|즐기다
explain|ɪkˈspleɪn|설명하다
feel|fiːl|느끼다
finish|ˈfɪnɪʃ|끝내다
follow|ˈfɑːloʊ|따라가다
forget|fərˈɡet|잊다
grow|ɡroʊ|자라다, 기르다
hope|hoʊp|바라다
invite|ɪnˈvaɪt|초대하다
join|dʒɔɪn|가입하다, 함께하다
keep|kiːp|유지하다, 간직하다
leave|liːv|떠나다
meet|miːt|만나다
move|muːv|움직이다, 이사하다
need|niːd|필요하다
order|ˈɔːrdər|주문하다
pass|pæs|지나가다, 통과하다
practice|ˈpræktɪs|연습하다
remember|rɪˈmembər|기억하다
send|send|보내다
show|ʃoʊ|보여 주다
spend|spend|쓰다, 보내다
start|stɑːrt|시작하다
teach|tiːtʃ|가르치다
travel|ˈtrævəl|여행하다
try|traɪ|시도하다
understand|ˌʌndərˈstænd|이해하다
visit|ˈvɪzɪt|방문하다
wait|weɪt|기다리다
wear|wer|입다, 착용하다
win|wɪn|이기다
wish|wɪʃ|바라다, 소원하다
borrow|ˈbɑːroʊ|빌리다
return|rɪˈtɝːn|돌려주다, 돌아오다
share|ʃer|나누다, 공유하다
add|æd|더하다
advise|ədˈvaɪz|조언하다
announce|əˈnaʊns|발표하다
apologize|əˈpɑːlədʒaɪz|사과하다
apply|əˈplaɪ|신청하다, 적용하다
behave|bɪˈheɪv|행동하다
complain|kəmˈpleɪn|불평하다
complete|kəmˈpliːt|완료하다
continue|kənˈtɪnjuː|계속하다
control|kənˈtroʊl|통제하다
divide|dɪˈvaɪd|나누다
enter|ˈentər|들어가다
escape|ɪˈskeɪp|탈출하다
expect|ɪkˈspekt|기대하다
fail|feɪl|실패하다
fill|fɪl|채우다
guess|ɡes|추측하다
happen|ˈhæpən|일어나다
introduce|ˌɪntrəˈduːs|소개하다
miss|mɪs|놓치다, 그리워하다
prepare|prɪˈper|준비하다
promise|ˈprɑːmɪs|약속하다
reach|riːtʃ|도달하다
receive|rɪˈsiːv|받다
refuse|rɪˈfjuːz|거절하다
repeat|rɪˈpiːt|반복하다
reply|rɪˈplaɪ|대답하다
search|sɝːtʃ|찾다, 검색하다
seem|siːm|~인 것 같다
thank|θæŋk|감사하다
translate|trænsˈleɪt|번역하다
waste|weɪst|낭비하다
wonder|ˈwʌndər|궁금해하다
belong|bɪˈlɔːŋ|속하다
collect|kəˈlekt|모으다
deliver|dɪˈlɪvər|배달하다
handle|ˈhændəl|다루다
lead|liːd|이끌다
print|prɪnt|인쇄하다
raise|reɪz|올리다, 기르다
pack|pæk|짐을 싸다
remind|rɪˈmaɪnd|상기시키다
fold|foʊld|접다
calculate|ˈkælkjəleɪt|계산하다
celebrate|ˈseləbreɪt|축하하다
cancel|ˈkænsəl|취소하다
decorate|ˈdekəreɪt|장식하다
disagree|ˌdɪsəˈɡriː|동의하지 않다
download|ˌdaʊnˈloʊd|내려받다
`,
      adjective: `
afraid|əˈfreɪd|두려워하는
angry|ˈæŋɡri|화난
bright|braɪt|밝은, 똑똑한
careful|ˈkerfəl|조심하는
careless|ˈkerləs|부주의한
comfortable|ˈkʌmftərbəl|편안한
dangerous|ˈdeɪndʒərəs|위험한
different|ˈdɪfərənt|다른
difficult|ˈdɪfəkəlt|어려운
excited|ɪkˈsaɪtɪd|신이 난
famous|ˈfeɪməs|유명한
friendly|ˈfrendli|친절한
healthy|ˈhelθi|건강한
important|ɪmˈpɔːrtənt|중요한
interesting|ˈɪntrəstɪŋ|흥미로운
popular|ˈpɑːpjələr|인기 있는
quiet|ˈkwaɪət|조용한
ready|ˈredi|준비된
rich|rɪtʃ|부유한
safe|seɪf|안전한
same|seɪm|같은
special|ˈspeʃəl|특별한
surprised|sərˈpraɪzd|놀란
surprising|sərˈpraɪzɪŋ|놀라운
useful|ˈjuːsfəl|유용한
usual|ˈjuːʒuəl|평소의
wonderful|ˈwʌndərfəl|멋진
worried|ˈwɝːid|걱정하는
local|ˈloʊkəl|지역의
necessary|ˈnesəseri|필요한
possible|ˈpɑːsəbəl|가능한
simple|ˈsɪmpəl|간단한
terrible|ˈterəbəl|끔찍한
thirsty|ˈθɝːsti|목마른
absent|ˈæbsənt|결석한
active|ˈæktɪv|활동적인
alive|əˈlaɪv|살아 있는
alone|əˈloʊn|혼자 있는
amazing|əˈmeɪzɪŋ|놀라운
awful|ˈɔːfəl|끔찍한
blind|blaɪnd|눈이 먼
bored|bɔːrd|지루해하는
boring|ˈbɔːrɪŋ|지루한
cheerful|ˈtʃɪrfəl|쾌활한
clear|klɪr|분명한, 맑은
clever|ˈklevər|영리한
cloudy|ˈklaʊdi|흐린
dead|ded|죽은
deep|diːp|깊은
gentle|ˈdʒentəl|상냥한
glad|ɡlæd|기쁜
gray|ɡreɪ|회색의
green|ɡriːn|초록색의
helpful|ˈhelpfəl|도움이 되는
honest|ˈɑːnɪst|정직한
huge|hjuːdʒ|거대한
independent|ˌɪndɪˈpendənt|독립적인
lovely|ˈlʌvli|사랑스러운
mad|mæd|화난
narrow|ˈnæroʊ|좁은
nervous|ˈnɝːvəs|긴장한
pleased|pliːzd|기쁜, 만족한
proud|praʊd|자랑스러워하는
rainy|ˈreɪni|비가 오는
real|riːl|진짜의
responsible|rɪˈspɑːnsəbəl|책임감 있는
round|raʊnd|둥근
silent|ˈsaɪlənt|조용한
smooth|smuːð|매끄러운
social|ˈsoʊʃəl|사회적인
sorry|ˈsɑːri|미안한
straight|streɪt|곧은
sure|ʃʊr|확신하는
tiny|ˈtaɪni|아주 작은
upset|ʌpˈset|속상한
wet|wet|젖은
wise|waɪz|현명한
yellow|ˈjeloʊ|노란색의
curious|ˈkjʊriəs|궁금해하는
foreign|ˈfɔːrən|외국의
pleasant|ˈplezənt|기분 좋은
strange|streɪndʒ|이상한
shy|ʃaɪ|수줍은
wild|waɪld|야생의
minor|ˈmaɪnər|작은, 중요하지 않은
`,
    },
    고등: {
      noun: `
ability|əˈbɪləti|능력
advantage|ədˈvæntɪdʒ|장점
attention|əˈtenʃən|주의, 관심
behavior|bɪˈheɪvjər|행동
challenge|ˈtʃælɪndʒ|도전
choice|tʃɔɪs|선택
community|kəˈmjuːnəti|공동체
condition|kənˈdɪʃən|상태, 조건
culture|ˈkʌltʃər|문화
decision|dɪˈsɪʒən|결정
development|dɪˈveləpmənt|발달, 발전
education|ˌedʒəˈkeɪʃən|교육
effect|ɪˈfekt|영향, 결과
environment|ɪnˈvaɪrənmənt|환경
experience|ɪkˈspɪriəns|경험
fact|fækt|사실
freedom|ˈfriːdəm|자유
government|ˈɡʌvərnmənt|정부
knowledge|ˈnɑːlɪdʒ|지식
memory|ˈmeməri|기억
opportunity|ˌɑːpərˈtuːnəti|기회
opinion|əˈpɪnjən|의견
population|ˌpɑːpjəˈleɪʃən|인구
purpose|ˈpɝːpəs|목적
quality|ˈkwɑːləti|질, 품질
relationship|rɪˈleɪʃənʃɪp|관계
research|rɪˈsɝːtʃ|연구
responsibility|rɪˌspɑːnsəˈbɪləti|책임
society|səˈsaɪəti|사회
technology|tekˈnɑːlədʒi|기술
tradition|trəˈdɪʃən|전통
value|ˈvæljuː|가치
violence|ˈvaɪələns|폭력
wildlife|ˈwaɪldlaɪf|야생 동물
resource|ˈriːsɔːrs|자원
economy|ɪˈkɑːnəmi|경제
industry|ˈɪndəstri|산업
material|məˈtɪriəl|재료
method|ˈmeθəd|방법
opposite|ˈɑːpəzɪt|반대
achievement|əˈtʃiːvmənt|성취
argument|ˈɑːrɡjumənt|논쟁, 주장
communication|kəˌmjuːnəˈkeɪʃən|의사소통
competition|ˌkɑːmpəˈtɪʃən|경쟁
consequence|ˈkɑːnsəkwens|결과
solution|səˈluːʃən|해결책
standard|ˈstændərd|기준
treatment|ˈtriːtmənt|치료, 대우
wealth|welθ|부
feature|ˈfiːtʃər|특징
agriculture|ˈæɡrɪkʌltʃər|농업
analysis|əˈnæləsɪs|분석
approach|əˈproʊtʃ|접근, 접근법
area|ˈeriə|지역, 분야
aspect|ˈæspekt|측면
authority|əˈθɔːrəti|권한, 당국
category|ˈkætəɡɔːri|범주
climate|ˈklaɪmət|기후
conflict|ˈkɑːnflɪkt|갈등
context|ˈkɑːntekst|맥락
contract|ˈkɑːntrækt|계약
contribution|ˌkɑːntrɪˈbjuːʃən|기여
debate|dɪˈbeɪt|토론
demand|dɪˈmænd|요구, 수요
design|dɪˈzaɪn|설계, 디자인
detail|ˈdiːteɪl|세부 사항
diversity|daɪˈvɝːsəti|다양성
document|ˈdɑːkjumənt|문서
drama|ˈdrɑːmə|극, 드라마
duty|ˈduːti|의무
effort|ˈefərt|노력
element|ˈeləmənt|요소
evidence|ˈevədəns|증거
exchange|ɪksˈtʃeɪndʒ|교환
expense|ɪkˈspens|비용
expert|ˈekspɝːt|전문가
factor|ˈfæktər|요인
failure|ˈfeɪljər|실패
fashion|ˈfæʃən|유행, 패션
finance|ˈfaɪnæns|재정
focus|ˈfoʊkəs|초점
foundation|faʊnˈdeɪʃən|기초, 재단
function|ˈfʌŋkʃən|기능
goal|ɡoʊl|목표
growth|ɡroʊθ|성장
impact|ˈɪmpækt|영향
importance|ɪmˈpɔːrtəns|중요성
impression|ɪmˈpreʃən|인상
independence|ˌɪndɪˈpendəns|독립
issue|ˈɪʃuː|문제, 쟁점
item|ˈaɪtəm|항목
limit|ˈlɪmɪt|한계
majority|məˈdʒɔːrəti|대다수
management|ˈmænɪdʒmənt|관리
mission|ˈmɪʃən|임무
mistake|mɪˈsteɪk|실수
movement|ˈmuːvmənt|움직임, 운동
nature|ˈneɪtʃər|자연, 본성
object|ˈɑːbdʒekt|물체, 대상
occasion|əˈkeɪʒən|경우, 행사
policy|ˈpɑːləsi|정책
principle|ˈprɪnsəpəl|원칙
process|ˈprɑːses|과정
progress|ˈprɑːɡres|진전, 발전
property|ˈprɑːpərti|재산, 특성
range|reɪndʒ|범위
region|ˈriːdʒən|지역
regulation|ˌreɡjuˈleɪʃən|규정
security|sɪˈkjʊrəti|안전, 보안
source|sɔːrs|출처, 근원
structure|ˈstrʌktʃər|구조
survey|ˈsɝːveɪ|설문 조사
task|tæsk|과제
theory|ˈθɪri|이론
threat|θret|위협
topic|ˈtɑːpɪk|주제
view|vjuː|견해, 관점
award|əˈwɔːrd|상
belief|bɪˈliːf|믿음
benefit|ˈbenəfɪt|이점, 혜택
`,
      verb: `
achieve|əˈtʃiːv|성취하다
affect|əˈfekt|영향을 주다
allow|əˈlaʊ|허락하다
appear|əˈpɪr|나타나다
avoid|əˈvɔɪd|피하다
cause|kɔːz|초래하다
compare|kəmˈper|비교하다
consider|kənˈsɪdər|고려하다
create|kriˈeɪt|창조하다
describe|dɪˈskraɪb|묘사하다
develop|dɪˈveləp|발전시키다
discover|dɪˈskʌvər|발견하다
encourage|ɪnˈkɝːɪdʒ|격려하다
establish|ɪˈstæblɪʃ|설립하다
exist|ɪɡˈzɪst|존재하다
improve|ɪmˈpruːv|향상시키다
include|ɪnˈkluːd|포함하다
increase|ɪnˈkriːs|증가하다
influence|ˈɪnfluəns|영향을 미치다
involve|ɪnˈvɑːlv|포함하다, 관련시키다
manage|ˈmænɪdʒ|관리하다
offer|ˈɔːfər|제공하다
produce|prəˈduːs|생산하다
protect|prəˈtekt|보호하다
provide|prəˈvaɪd|제공하다
realize|ˈriːəlaɪz|깨닫다
reduce|rɪˈduːs|줄이다
remain|rɪˈmeɪn|남아 있다
require|rɪˈkwaɪər|요구하다
respond|rɪˈspɑːnd|응답하다
solve|sɑːlv|해결하다
support|səˈpɔːrt|지지하다
suggest|səˈdʒest|제안하다
suppose|səˈpoʊz|가정하다
survive|sərˈvaɪv|살아남다
accept|əkˈsept|받아들이다
argue|ˈɑːrɡjuː|논쟁하다
attend|əˈtend|참석하다
communicate|kəˈmjuːnəkeɪt|의사소통하다
contribute|kənˈtrɪbjuːt|기여하다
analyze|ˈænəlaɪz|분석하다
assess|əˈses|평가하다
assume|əˈsuːm|가정하다
claim|kleɪm|주장하다
clarify|ˈklerəfaɪ|명확하게 하다
conduct|kənˈdʌkt|수행하다
confirm|kənˈfɝːm|확인하다
connect|kəˈnekt|연결하다
consist|kənˈsɪst|이루어져 있다
convince|kənˈvɪns|확신시키다
demonstrate|ˈdemənstreɪt|입증하다
determine|dɪˈtɝːmɪn|결정하다
distinguish|dɪˈstɪŋɡwɪʃ|구별하다
distribute|dɪˈstrɪbjuːt|분배하다
emphasize|ˈemfəsaɪz|강조하다
enable|ɪˈneɪbəl|가능하게 하다
ensure|ɪnˈʃʊr|보장하다
evaluate|ɪˈvæljueɪt|평가하다
examine|ɪɡˈzæmɪn|조사하다
expand|ɪkˈspænd|확장하다
explore|ɪkˈsplɔːr|탐구하다
express|ɪkˈspres|표현하다
extend|ɪkˈstend|늘리다, 연장하다
gain|ɡeɪn|얻다
identify|aɪˈdentəfaɪ|확인하다, 식별하다
indicate|ˈɪndəkeɪt|나타내다
interpret|ɪnˈtɝːprɪt|해석하다
maintain|meɪnˈteɪn|유지하다
obtain|əbˈteɪn|얻다
perform|pərˈfɔːrm|수행하다
persuade|pərˈsweɪd|설득하다
prevent|prɪˈvent|막다, 예방하다
publish|ˈpʌblɪʃ|출판하다
recognize|ˈrekəɡnaɪz|알아보다, 인정하다
recommend|ˌrekəˈmend|추천하다
reflect|rɪˈflekt|반영하다, 숙고하다
reject|rɪˈdʒekt|거절하다
release|rɪˈliːs|발표하다, 풀어 주다
represent|ˌreprɪˈzent|나타내다, 대표하다
reveal|rɪˈviːl|드러내다
select|sɪˈlekt|선택하다
separate|ˈsepəreɪt|분리하다
strengthen|ˈstreŋθən|강화하다
struggle|ˈstrʌɡəl|애쓰다, 고군분투하다
target|ˈtɑːrɡɪt|목표로 삼다
transform|trænsˈfɔːrm|변화시키다
vary|ˈveri|달라지다
advance|ədˈvæns|진전시키다
attract|əˈtrækt|끌어들이다
combine|kəmˈbaɪn|결합하다
depend|dɪˈpend|의존하다
estimate|ˈestəmeɪt|추정하다
generate|ˈdʒenəreɪt|생성하다
ignore|ɪɡˈnɔːr|무시하다
imply|ɪmˈplaɪ|암시하다
occur|əˈkɝːr|발생하다
participate|pɑːrˈtɪsəpeɪt|참여하다
pursue|pərˈsuː|추구하다
recover|rɪˈkʌvər|회복하다
refer|rɪˈfɝːr|언급하다, 참고하다
relate|rɪˈleɪt|관련시키다
replace|rɪˈpleɪs|대체하다
request|rɪˈkwest|요청하다
retain|rɪˈteɪn|유지하다, 보유하다
`,
      adjective: `
aware|əˈwer|알고 있는
basic|ˈbeɪsɪk|기본적인
certain|ˈsɝːtən|확실한
common|ˈkɑːmən|흔한, 공통의
complex|kəmˈpleks|복잡한
confident|ˈkɑːnfədənt|자신 있는
creative|kriˈeɪtɪv|창의적인
current|ˈkɝːənt|현재의
effective|ɪˈfektɪv|효과적인
essential|ɪˈsenʃəl|필수적인
excellent|ˈeksələnt|훌륭한
global|ˈɡloʊbəl|세계적인
individual|ˌɪndəˈvɪdʒuəl|개인의
likely|ˈlaɪkli|가능성이 큰
major|ˈmeɪdʒər|주요한
modern|ˈmɑːdərn|현대의
natural|ˈnætʃərəl|자연의
ordinary|ˈɔːrdəneri|평범한
personal|ˈpɝːsənəl|개인적인
physical|ˈfɪzɪkəl|신체의, 물리적인
positive|ˈpɑːzətɪv|긍정적인
practical|ˈpræktɪkəl|실용적인
private|ˈpraɪvət|사적인
recent|ˈriːsənt|최근의
serious|ˈsɪriəs|심각한, 진지한
similar|ˈsɪmələr|비슷한
specific|spəˈsɪfɪk|구체적인
successful|səkˈsesfəl|성공한
traditional|trəˈdɪʃənəl|전통적인
valuable|ˈvæljuəbəl|가치 있는
accurate|ˈækjərət|정확한
additional|əˈdɪʃənəl|추가의
appropriate|əˈproʊpriət|적절한
beneficial|ˌbenəˈfɪʃəl|유익한
broad|brɔːd|넓은
capable|ˈkeɪpəbəl|유능한, 할 수 있는
chief|tʃiːf|주요한
civil|ˈsɪvəl|시민의
commercial|kəˈmɝːʃəl|상업의
competitive|kəmˈpetətɪv|경쟁력 있는
considerable|kənˈsɪdərəbəl|상당한
constant|ˈkɑːnstənt|끊임없는
cultural|ˈkʌltʃərəl|문화의
deliberate|dɪˈlɪbərət|의도적인
dependent|dɪˈpendənt|의존하는
direct|dəˈrekt|직접적인
distinct|dɪˈstɪŋkt|뚜렷이 다른
domestic|dəˈmestɪk|국내의, 가정의
dramatic|drəˈmætɪk|극적인
educational|ˌedʒəˈkeɪʃənəl|교육의
efficient|ɪˈfɪʃənt|효율적인
enormous|ɪˈnɔːrməs|거대한
financial|faɪˈnænʃəl|재정의
former|ˈfɔːrmər|이전의
formal|ˈfɔːrməl|공식적인
frequent|ˈfriːkwənt|빈번한
fundamental|ˌfʌndəˈmentəl|기본적인
initial|ɪˈnɪʃəl|초기의
limited|ˈlɪmɪtɪd|제한된
overall|ˌoʊvərˈɔːl|전반적인
particular|pərˈtɪkjələr|특정한
political|pəˈlɪtɪkəl|정치의
professional|prəˈfeʃənəl|전문적인
proper|ˈprɑːpər|적절한
relevant|ˈreləvənt|관련 있는
reliable|rɪˈlaɪəbəl|믿을 만한
remarkable|rɪˈmɑːrkəbəl|주목할 만한
significant|sɪɡˈnɪfɪkənt|중요한
slight|slaɪt|약간의
sufficient|səˈfɪʃənt|충분한
technical|ˈteknɪkəl|기술적인
temporary|ˈtempəreri|일시적인
theoretical|ˌθiːəˈretɪkəl|이론적인
unique|juˈniːk|독특한
urban|ˈɝːbən|도시의
widespread|ˈwaɪdspred|널리 퍼진
`,
    }
  };

  const nounExamples = {
    apple: "I eat an apple after school.",
    book: "I read a book before bed.",
    boy: "The boy is playing soccer.",
    girl: "The girl has a new bag.",
    school: "My school is near my house.",
    teacher: "My teacher is very kind.",
    student: "The student asks a good question.",
    friend: "I play with my friend after school.",
    family: "My family eats dinner together.",
    mother: "My mother makes breakfast for us.",
    father: "My father drives me to school.",
    sister: "My sister likes listening to music.",
    brother: "My brother plays basketball after school.",
    house: "Our house has a small garden.",
    room: "I clean my room every Saturday.",
    door: "Please close the door.",
    window: "Please open the window.",
    table: "The book is on the table.",
    chair: "Please sit on this chair.",
    bed: "I go to bed at nine.",
    water: "I drink water after I exercise.",
    milk: "She drinks milk every morning.",
    bread: "I eat bread for breakfast.",
    rice: "We eat rice with dinner.",
    egg: "I had an egg for breakfast.",
    food: "The food smells delicious.",
    cat: "The cat is sleeping on the sofa.",
    dog: "My dog likes to run in the park.",
    bird: "A bird is singing in the tree.",
    fish: "We saw a fish in the river.",
    horse: "The horse runs across the field.",
    tree: "A bird is sitting in the tree.",
    flower: "This flower smells sweet.",
    sun: "The sun is bright today.",
    moon: "The moon looks beautiful tonight.",
    star: "I can see a star in the sky.",
    sky: "The sky is clear today.",
    rain: "The rain stopped this morning.",
    snow: "The snow covered the ground.",
    wind: "The wind is strong today.",
    day: "I had a good day at school.",
    night: "I read a book at night.",
    morning: "I take a walk every morning.",
    time: "What time does the movie start?",
    year: "I will study hard this year.",
    name: "What is your name?",
    hand: "Please raise your hand.",
    head: "My head hurts.",
    eye: "She has blue eyes.",
    face: "He washed his face with warm water.",
    foot: "My foot hurts after the long walk.",
    mouth: "Please open your mouth.",
    leg: "He hurt his leg while running.",
    car: "My family travels by car.",
    bus: "I take the bus to school.",
    train: "The train arrives at noon.",
    bike: "I ride my bike to the park.",
    ball: "The boy kicked the ball.",
    game: "We played a fun game together.",
    music: "I listen to music on the bus.",
    picture: "I took a picture of the flowers.",
    toy: "The child put the toy away.",
    box: "Put the books in the box.",
    bag: "My school bag is heavy.",
    cup: "The cup is full of water.",
    clock: "The clock says ten o'clock.",
    park: "We play soccer in the park.",
    city: "New York is a large city.",
    garden: "We grow vegetables in our garden.",
    street: "Look both ways before crossing the street."
  };
  const examples = {
    noun: function (word, index, level) {
      if (nounExamples[word]) return nounExamples[word];
      const templates = level === "초등" ? [
        "Can you see the " + word + "?",
        "I found the " + word + " today.",
        "Let's learn about the " + word + ".",
        "We talked about the " + word + ".",
        "Tell me about the " + word + ".",
        "I read about the " + word + " in class.",
        "Have you seen the " + word + "?",
        "Can you find the " + word + "?"
      ] : level === "중등" ? [
        "We learned about the " + word + " in class.",
        "She found new facts about the " + word + ".",
        "They discussed the " + word + " after school.",
        "He wrote a short report about the " + word + ".",
        "Our class shared ideas about the " + word + ".",
        "We saw the " + word + " during our trip.",
        "Can you explain the " + word + " to me?",
        "The book gives an example of the " + word + "."
      ] : [
        "Researchers examined the role of the " + word + " in society.",
        "The report considers the impact of the " + word + " on daily life.",
        "Her essay compares the " + word + " with a related idea.",
        "The article presents a new perspective on the " + word + ".",
        "We discussed how the " + word + " affects our community.",
        "His research explores the history of the " + word + ".",
        "The speaker explained why the " + word + " remains important.",
        "Understanding the " + word + " requires careful attention to context."
      ];
      return templates[index % templates.length];
    },
    verb: function (word, index, level) {
      const commonExamples = {
        be: "I want to be a good student.",
        have: "I have enough time.",
        do: "I do my homework after school.",
        see: "I see my friends every day.",
        like: "I like reading books.",
        love: "I love my family.",
        want: "I want to learn English.",
        know: "I know the answer."
      };
      if (commonExamples[word]) return commonExamples[word];
      const templates = level === "초등" ? [
        "I can " + word + " well.",
        "Let's " + word + " together.",
        "Can you " + word + " today?",
        "Please " + word + " with me.",
        "We " + word + " after school.",
        "She likes to " + word + ".",
        "Try to " + word + " again.",
        "Do you want to " + word + "?"
      ] : level === "중등" ? [
        "We practiced how to " + word + " after class.",
        "She learned to " + word + " more carefully.",
        "Can you explain how to " + word + "?",
        "They decided to " + word + " before lunch.",
        "He tried to " + word + " without help.",
        "We watched them " + word + " during the game.",
        "I learned when to " + word + " in class.",
        "The team found a new way to " + word + "."
      ] : [
        "Students should " + word + " carefully when conditions change.",
        "She explained how to " + word + " without wasting time.",
        "We chose to " + word + " after reviewing the available options.",
        "He managed to " + word + " despite several unexpected problems.",
        "They discovered a better way to " + word + " efficiently.",
        "The group agreed to " + word + " once everyone was ready.",
        "Please " + word + " with care to avoid unnecessary problems.",
        "Learning to " + word + " well requires patience and careful planning."
      ];
      return templates[index % templates.length];
    },
    adjective: function (word, index, level) {
      const templates = level === "초등" ? [
        "We learned '" + word + "' today.",
        "Can you say '" + word + "'?",
        "Use '" + word + "' in a sentence.",
        "She wrote '" + word + "' down.",
        "Let's practice '" + word + "' today.",
        "He chose '" + word + "' for his story.",
        "Try '" + word + "' in this sentence.",
        "Do you know '" + word + "'?"
      ] : level === "중등" ? [
        "We used '" + word + "' in our class story.",
        "Can you explain what '" + word + "' means?",
        "She chose '" + word + "' to describe the scene.",
        "The word '" + word + "' appears in the passage.",
        "He compared '" + word + "' with another adjective.",
        "Try using '" + word + "' in your own sentence.",
        "Our teacher asked us to define '" + word + "'.",
        "They discussed how to use '" + word + "'."
      ] : [
        "The author uses '" + word + "' to shape the reader's impression.",
        "This adjective helps explain the character's changing mood.",
        "The passage uses '" + word + "' to create a clear image.",
        "Compare '" + word + "' with a more precise description.",
        "The writer chose '" + word + "' to strengthen the argument.",
        "Context can change how readers understand '" + word + "'.",
        "The article uses '" + word + "' in a specific context.",
        "Explain why '" + word + "' is effective in this sentence."
      ];
      return templates[index % templates.length];
    }
  };

  const nounExampleTranslations = {
    apple: "방과 후에 사과를 먹습니다.",
    book: "잠자리에 들기 전에 책을 읽습니다.",
    boy: "그 소년은 축구를 하고 있습니다.",
    girl: "그 소녀는 새 가방을 가지고 있습니다.",
    school: "우리 학교는 집 근처에 있습니다.",
    teacher: "우리 선생님은 매우 친절하십니다.",
    student: "그 학생은 좋은 질문을 합니다.",
    friend: "방과 후에 친구와 놀아요.",
    family: "우리 가족은 함께 저녁을 먹습니다.",
    mother: "어머니는 우리를 위해 아침을 만들어 주십니다.",
    father: "아버지는 차로 저를 학교에 데려다주십니다.",
    sister: "여동생은 음악 듣는 것을 좋아합니다.",
    brother: "남자 형제는 방과 후에 농구를 합니다.",
    house: "우리 집에는 작은 정원이 있습니다.",
    room: "매주 토요일에 제 방을 청소합니다.",
    door: "문을 닫아 주세요.",
    window: "창문을 열어 주세요.",
    table: "책은 탁자 위에 있습니다.",
    chair: "이 의자에 앉으세요.",
    bed: "아홉 시에 잠자리에 듭니다.",
    water: "운동한 뒤에 물을 마십니다.",
    milk: "그녀는 매일 아침 우유를 마십니다.",
    bread: "아침 식사로 빵을 먹습니다.",
    rice: "저녁 식사에 밥을 먹습니다.",
    egg: "아침으로 달걀을 먹었습니다.",
    food: "음식에서 맛있는 냄새가 납니다.",
    cat: "고양이가 소파에서 자고 있습니다.",
    dog: "우리 강아지는 공원에서 뛰는 것을 좋아합니다.",
    bird: "새 한 마리가 나무에서 노래하고 있습니다.",
    fish: "강에서 물고기 한 마리를 보았습니다.",
    horse: "말이 들판을 가로질러 달립니다.",
    tree: "새 한 마리가 나무에 앉아 있습니다.",
    flower: "이 꽃은 향기가 달콤합니다.",
    sun: "오늘은 해가 밝게 빛납니다.",
    moon: "오늘 밤 달이 아름다워 보입니다.",
    star: "하늘에서 별 하나가 보입니다.",
    sky: "오늘 하늘은 맑습니다.",
    rain: "오늘 아침에 비가 그쳤습니다.",
    snow: "눈이 땅을 덮었습니다.",
    wind: "오늘은 바람이 강하게 붑니다.",
    day: "학교에서 즐거운 하루를 보냈습니다.",
    night: "밤에 책을 읽습니다.",
    morning: "매일 아침 산책합니다.",
    time: "영화는 몇 시에 시작하나요?",
    year: "올해는 열심히 공부할 거예요.",
    name: "이름이 무엇인가요?",
    hand: "손을 들어 주세요.",
    head: "머리가 아픕니다.",
    eye: "그녀는 파란 눈을 가지고 있습니다.",
    face: "그는 따뜻한 물로 얼굴을 씻었습니다.",
    foot: "오래 걸은 뒤 발이 아픕니다.",
    mouth: "입을 벌려 주세요.",
    leg: "그는 달리다가 다리를 다쳤습니다.",
    car: "우리 가족은 자동차로 여행합니다.",
    bus: "버스를 타고 학교에 갑니다.",
    train: "기차는 정오에 도착합니다.",
    bike: "자전거를 타고 공원에 갑니다.",
    ball: "그 소년은 공을 찼습니다.",
    game: "우리는 함께 재미있는 게임을 했습니다.",
    music: "버스에서 음악을 듣습니다.",
    picture: "꽃 사진을 찍었습니다.",
    toy: "아이가 장난감을 치웠습니다.",
    box: "책들을 상자 안에 넣으세요.",
    bag: "책가방이 무겁습니다.",
    cup: "컵에 물이 가득합니다.",
    clock: "시계가 열 시를 가리킵니다.",
    park: "공원에서 축구를 합니다.",
    city: "뉴욕은 큰 도시입니다.",
    garden: "정원에서 채소를 기릅니다.",
    street: "길을 건너기 전에 양쪽을 살펴보세요."
  };

  const nounKoreanTemplates = [
    "오늘 수업에서 {meaning}에 대해 배웠습니다.",
    "오늘 {obj} 보았습니다.",
    "{meaning}에 대해 말해 주세요.",
    "수업에서 {meaning}에 관한 글을 읽었습니다.",
    "{obj} 본 적 있나요?",
    "{meaning}에 대해 글을 썼습니다.",
    "오늘 {meaning}에 관해 이야기했습니다.",
    "{obj} 찾을 수 있나요?"
  ];
  const levelNounKoreanTemplates = {
    중등: [
      "수업에서 {meaning}에 대해 배웠습니다.",
      "{meaning}에 관한 새로운 사실을 찾았습니다.",
      "방과 후에 {meaning}에 대해 토론했습니다.",
      "{meaning}에 대한 짧은 보고서를 썼습니다.",
      "우리 반은 {meaning}에 대한 생각을 나눴습니다.",
      "여행 중에 {obj} 보았습니다.",
      "{meaning}에 대해 설명해 줄 수 있나요?",
      "책에서 {meaning}의 예를 찾았습니다."
    ],
    고등: [
      "사회에서 {meaning}{subj} 어떤 역할을 하는지 연구했습니다.",
      "보고서는 {meaning}{subj} 일상에 미치는 영향을 다룹니다.",
      "그녀의 글은 {obj} 관련 개념과 비교합니다.",
      "기사는 {meaning}에 대한 새로운 관점을 제시합니다.",
      "{meaning}{subj} 공동체에 미치는 영향을 논의했습니다.",
      "그의 연구는 {meaning}의 역사를 살펴봅니다.",
      "발표자는 {meaning}{subj} 여전히 중요한 이유를 설명했습니다.",
      "{obj} 이해하려면 맥락을 주의 깊게 살펴야 합니다."
    ]
  };
  const levelVerbKoreanTemplates = {
    중등: [
      "{gerund}는 방법을 수업 후에 연습했습니다.",
      "그녀는 더 주의해서 {infinitive}를 배웠습니다.",
      "어떻게 {gerund}는지 설명해 줄 수 있나요?",
      "점심 전에 {infinitive}로 결정했습니다.",
      "도움 없이 {infinitive}를 시도했습니다.",
      "경기 중에 그들이 {gerund} 것을 보았습니다.",
      "수업에서 언제 {gerund}는지 배웠습니다.",
      "그 팀은 {gerund} 새로운 방법을 찾았습니다."
    ],
    고등: [
      "상황이 바뀌면 신중하게 {necessity} 합니다.",
      "시간을 낭비하지 않고 {gerund}는 방법을 설명했습니다.",
      "가능한 선택지를 검토한 뒤 {infinitive}로 결정했습니다.",
      "예기치 못한 문제가 있었지만 {gerund} 데 성공했습니다.",
      "효율적으로 {gerund} 더 나은 방법을 발견했습니다.",
      "모두 준비되면 {infinitive}기로 합의했습니다.",
      "불필요한 문제를 피하려면 신중하게 {necessity} 합니다.",
      "잘 {infinitive} 위해서는 인내심과 계획이 필요합니다."
    ]
  };
  const levelAdjectiveKoreanTemplates = {
    중등: [
      "수업 이야기에서 '{word}'를 사용했습니다.",
      "'{word}'가 무슨 뜻인지 설명할 수 있나요?",
      "그녀는 장면을 묘사할 때 '{word}'를 골랐습니다.",
      "글에 '{word}'라는 단어가 나옵니다.",
      "그는 '{word}'를 다른 형용사와 비교했습니다.",
      "직접 만든 문장에 '{word}'를 사용해 보세요.",
      "선생님은 '{word}'의 뜻을 설명해 보라고 하셨습니다.",
      "'{word}'를 어떻게 쓰는지 함께 이야기했습니다."
    ],
    고등: [
      "글쓴이는 독자의 인상을 만들기 위해 '{word}'를 사용합니다.",
      "이 형용사는 인물의 달라지는 기분을 설명합니다.",
      "글은 선명한 이미지를 만들기 위해 '{word}'를 사용합니다.",
      "'{word}'와 더 정확한 표현을 비교해 보세요.",
      "글쓴이는 주장을 뒷받침하려고 '{word}'를 골랐습니다.",
      "문맥에 따라 '{word}'의 의미가 달라질 수 있습니다.",
      "이 기사는 특정한 맥락에서 '{word}'를 사용합니다.",
      "이 문장에서 '{word}'가 효과적인 이유를 설명하세요."
    ]
  };

  function primaryMeaning(meaning) {
    return String(meaning).split(/[;,]/)[0]
      .replace(/\s*\((?:명사|동사|형용사|부사|전치사|접속사)\)/g, "")
      .trim();
  }

  function koreanParticle(value) {
    const last = String(value).trim().replace(/[.!?'"”’)\]]+$/g, "").slice(-1);
    const code = last.charCodeAt(0);
    if (code < 0xac00 || code > 0xd7a3) return "를";
    return (code - 0xac00) % 28 === 0 ? "를" : "을";
  }

  function koreanSubjectParticle(value) {
    const last = String(value).trim().replace(/[.!?'"”’)\]]+$/g, "").slice(-1);
    const code = last.charCodeAt(0);
    if (code < 0xac00 || code > 0xd7a3) return "는";
    return (code - 0xac00) % 28 === 0 ? "는" : "은";
  }

  function verbForms(meaning) {
    const verb = primaryMeaning(meaning).replace(/\s*\([^)]*\)/g, "").trim();
    const stem = verb.endsWith("다") ? verb.slice(0, -1) : verb;
    const last = stem.slice(-1);
    const code = last.charCodeAt(0);
    const hasFinalConsonant = code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
    let future = stem + (hasFinalConsonant ? "으려고" : "려고");
    if (stem === "듣" || stem === "걷") future = stem.slice(0, -1) + (stem === "듣" ? "들" : "걸") + "으려고";
    if (stem === "돕") future = "도우려고";
    let necessity = stem + (hasFinalConsonant ? "어야" : "야");
    if (stem.endsWith("하")) necessity = stem.slice(0, -1) + "해야";
    if (stem === "듣" || stem === "걷") necessity = stem.slice(0, -1) + (stem === "듣" ? "들어야" : "걸어야");
    if (stem === "돕") necessity = "도와야";
    let promise = stem + "겠다고";
    if (stem === "듣" || stem === "걷") promise = stem.slice(0, -1) + (stem === "듣" ? "듣겠다고" : "걷겠다고");
    if (stem === "돕") promise = "돕겠다고";
    return {
      infinitive: stem + "기",
      future: future,
      gerund: stem + "는",
      necessity: necessity,
      promise: promise
    };
  }

  const verbKoreanTemplates = [
    "{infinitive}를 좋아합니다.",
    "함께 {infinitive}를 원합니다.",
    "지금 {infinitive}가 가능한가요?",
    "오늘 {future} 합니다.",
    "그녀는 {infinitive}를 원합니다.",
    "그들은 {necessity} 합니다.",
    "그는 다시 {infinitive}를 원합니다.",
    "함께 {infinitive}를 좋아합니다."
  ];

  const verbExampleTranslations = {
    be: "훌륭한 학생이 되고 싶습니다.",
    have: "시간이 충분히 있습니다.",
    do: "방과 후에 숙제를 합니다.",
    see: "매일 친구들을 만납니다.",
    like: "책 읽는 것을 좋아합니다.",
    love: "가족을 사랑합니다.",
    want: "영어를 배우고 싶습니다.",
    know: "정답을 알고 있습니다."
  };

  const adjectiveKoreanTemplates = [
    "오늘 '{word}'를 배웠습니다.",
    "'{word}'라고 말할 수 있나요?",
    "문장에 '{word}'를 써 보세요.",
    "그녀는 '{word}'를 적었습니다.",
    "오늘 '{word}'를 연습합시다.",
    "그는 이야기에서 '{word}'를 골랐습니다.",
    "이 문장에 '{word}'를 써 보세요.",
    "'{word}'를 알고 있나요?"
  ];

  const alternateExampleTranslations = {
    "Apple makes computers and phones.": "애플은 컴퓨터와 휴대전화를 만듭니다.",
    "We booked a table for six.": "여섯 명 자리를 예약했습니다.",
    "We clean our classroom after art class.": "미술 수업이 끝나면 교실을 청소합니다.",
    "The boat rested on the riverbed.": "배가 강바닥에 놓여 있었습니다.",
    "Passengers boarded the train at noon.": "승객들은 정오에 기차에 탔습니다.",
    "The two athletes boxed for three rounds.": "두 선수는 3라운드 동안 권투 경기를 했습니다.",
    "They danced together at the school ball.": "그들은 학교 무도회에서 함께 춤을 췄습니다.",
    "I'll call you after the meeting.": "회의가 끝난 뒤 전화할게요.",
    "Keep the change, please.": "잔돈은 가지세요.",
    "The station is close to my house.": "역은 우리 집에서 가깝습니다.",
    "Your new jacket looks cool.": "새 재킷이 멋져 보여요.",
    "They moved to the country last year.": "그들은 작년에 시골로 이사했습니다.",
    "They have been dating for a year.": "그들은 1년째 교제하고 있습니다.",
    "We made a deal with the local store.": "동네 가게와 거래를 했습니다.",
    "My grandparents grow tomatoes in their garden.": "조부모님은 정원에서 토마토를 기르십니다.",
    "Please hand me the blue notebook.": "파란 공책을 건네주세요.",
    "The minute hand points to the twelve.": "분침이 12를 가리킵니다.",
    "We went home before it got dark.": "어두워지기 전에 집에 갔습니다.",
    "The building houses a small art collection.": "그 건물에는 작은 미술품 컬렉션이 있습니다.",
    "We must face the problem together.": "우리는 함께 그 문제에 맞서야 합니다.",
    "Our school held a science fair.": "우리 학교에서 과학 박람회를 열었습니다.",
    "He fasted before the medical test.": "그는 건강 검진 전에 금식했습니다.",
    "She works in the field of medicine.": "그녀는 의학 분야에서 일합니다.",
    "The latest sales figures are encouraging.": "최근 판매 수치는 고무적입니다.",
    "Drivers may pay a fine for parking here.": "이곳에 주차하면 운전자는 벌금을 낼 수 있습니다.",
    "We flew to Chicago last summer.": "지난여름에 비행기를 타고 시카고에 갔습니다.",
    "The room is ten feet wide.": "그 방의 너비는 10피트입니다.",
    "She studied hard for the exam.": "그녀는 시험을 위해 열심히 공부했습니다.",
    "Mina will head the new project.": "미나가 새 프로젝트를 이끌 예정입니다.",
    "What kind of music do you enjoy?": "어떤 종류의 음악을 즐겨 듣나요?",
    "The meeting lasted for an hour.": "회의는 한 시간 동안 계속됐습니다.",
    "They left before the rain began.": "그들은 비가 오기 전에 떠났습니다.",
    "The word 'cat' begins with the letter C.": "cat이라는 단어는 알파벳 C로 시작합니다.",
    "I received a letter from my cousin.": "사촌에게서 편지를 받았습니다.",
    "Please turn on the light.": "불을 켜 주세요.",
    "This bag is light enough to carry.": "이 가방은 들고 다닐 수 있을 만큼 가볍습니다.",
    "Her voice sounds like her mother's.": "그녀의 목소리는 어머니의 목소리와 비슷합니다.",
    "We lined up outside the theater.": "우리는 극장 밖에 줄을 섰습니다.",
    "What does this sign mean?": "이 표지판은 무슨 뜻인가요?",
    "It was mean to laugh at his mistake.": "그의 실수를 비웃는 것은 못된 행동이었습니다.",
    "He lit the candle with a match.": "그는 성냥으로 촛불을 켰습니다.",
    "These shoes match your jacket.": "이 신발은 재킷과 잘 어울립니다.",
    "We discussed an important matter at school.": "학교에서 중요한 문제를 논의했습니다.",
    "Your opinion matters to our team.": "당신의 의견은 우리 팀에 중요합니다.",
    "A minute detail changed the whole design.": "아주 작은 세부 사항 하나가 전체 디자인을 바꾸었습니다.",
    "I miss my friends during the summer break.": "여름 방학 동안 친구들이 그립습니다.",
    "Hurry, or you will miss the bus.": "서두르지 않으면 버스를 놓칠 거예요.",
    "This building was once a small library.": "이 건물은 한때 작은 도서관이었습니다.",
    "We ordered soup and salad for lunch.": "점심으로 수프와 샐러드를 주문했습니다.",
    "Please put the cards in alphabetical order.": "카드를 알파벳순으로 놓아 주세요.",
    "The doctor spoke kindly to each patient.": "의사는 환자 한 명 한 명에게 친절하게 말했습니다.",
    "You can park your car behind the building.": "건물 뒤에 차를 주차할 수 있습니다.",
    "Everyone can take part in the school play.": "누구나 학교 연극에 참여할 수 있습니다.",
    "She plays the piano after dinner.": "그녀는 저녁 식사 후 피아노를 연주합니다.",
    "Our class is putting on a play next week.": "우리 반은 다음 주에 연극을 공연합니다.",
    "The new plant makes electric cars.": "새 공장은 전기차를 만듭니다.",
    "We planted flowers along the path.": "길을 따라 꽃을 심었습니다.",
    "He made an important point during the discussion.": "그는 토론 중에 중요한 요점을 짚었습니다.",
    "I wrapped a present for my sister.": "여동생에게 줄 선물을 포장했습니다.",
    "He will present his idea to the class.": "그는 반 친구들에게 자신의 생각을 발표할 것입니다.",
    "Please describe the present situation.": "현재 상황을 설명해 주세요.",
    "Turn right at the next street.": "다음 거리에서 오른쪽으로 도세요.",
    "You chose the right answer.": "정답을 골랐습니다.",
    "I'll ring you when I get home.": "집에 도착하면 전화할게요.",
    "The wind rocked the boat gently.": "바람이 배를 부드럽게 흔들었습니다.",
    "The runners completed one round of the track.": "달리기 선수들은 트랙을 한 바퀴 돌았습니다.",
    "Her parents run a small bakery downtown.": "그녀의 부모님은 시내에서 작은 빵집을 운영합니다.",
    "The old computer still runs well.": "그 오래된 컴퓨터는 아직도 잘 작동합니다.",
    "She saves a little money every month.": "그녀는 매달 돈을 조금씩 저축합니다.",
    "The race was decided by one second.": "경주는 1초 차이로 승패가 갈렸습니다.",
    "The judge sentenced him to community service.": "판사는 그에게 사회봉사 명령을 내렸습니다.",
    "We heard a strange sound outside.": "밖에서 이상한 소리가 들렸습니다.",
    "They made a sound decision after careful thought.": "그들은 신중히 생각한 끝에 합리적인 결정을 내렸습니다.",
    "Astronauts conduct research in space.": "우주비행사들은 우주에서 연구를 수행합니다.",
    "The cat sprang onto the chair.": "고양이가 의자 위로 펄쩍 뛰어올랐습니다.",
    "A clear spring flows near the village.": "마을 근처에 맑은 샘물이 흐릅니다.",
    "I can't stand the noise in this room.": "이 방의 소음을 참을 수 없습니다.",
    "Texas is a large state in the United States.": "텍사스는 미국의 큰 주입니다.",
    "Please state your name clearly.": "이름을 분명하게 말씀해 주세요.",
    "This device stores thousands of photos.": "이 기기는 사진 수천 장을 저장합니다.",
    "They train every morning before school.": "그들은 매일 아침 학교에 가기 전에 훈련합니다.",
    "We watched the birds from the window.": "창문에서 새들을 지켜보았습니다.",
    "She waved goodbye from the train.": "그녀는 기차에서 손을 흔들며 작별 인사를 했습니다.",
    "The villagers get water from a deep well.": "마을 사람들은 깊은 우물에서 물을 얻습니다.",
    "The lights work perfectly after the repair.": "수리 후에 조명이 완벽하게 작동합니다.",
    "You have my word that I will help.": "돕겠다고 약속할게요.",
    "Please number each page of your report.": "보고서의 각 페이지에 번호를 매겨 주세요.",
    "She answered every question clearly.": "그녀는 모든 질문에 분명하게 대답했습니다.",
    "The library is open until eight tonight.": "도서관은 오늘 밤 여덟 시까지 문을 엽니다.",
    "He practices the guitar every afternoon.": "그는 매일 오후 기타를 연습합니다.",
    "He studied the works of the Impressionist school.": "그는 인상주의 화파의 작품을 연구했습니다.",
    "The table shows how much rain fell each month.": "표에는 매달 내린 비의 양이 나와 있습니다.",
    "The committee decided to table the proposal.": "위원회는 그 제안의 논의를 보류하기로 했습니다.",
    "Their office is on the fifth story of the building.": "그들의 사무실은 건물 5층에 있습니다.",
    "The documents are locked in the office safe.": "서류는 사무실 금고에 잠겨 있습니다.",
    "We are short of time, so let's begin.": "시간이 부족하니 시작합시다.",
    "Can you time my run with a stopwatch?": "스톱워치로 제 달리기 시간을 재 주실래요?"
  };

  const curatedExampleData = `
apple|The apple rolled off the table, so Mia picked it up and washed it.|사과가 탁자에서 굴러 떨어져서 미아는 주워 씻었습니다.
book|I borrowed a book about space from the library and finished it in two days.|도서관에서 우주에 관한 책을 빌려 이틀 만에 다 읽었습니다.
boy|The boy wore his raincoat and walked to school with his sister.|그 소년은 우비를 입고 여동생과 함께 학교까지 걸어갔습니다.
girl|The girl practiced her song every evening before the school concert.|그 소녀는 학교 음악회 전에 매일 저녁 노래를 연습했습니다.
school|Our school is collecting old books to donate to a children's hospital.|우리 학교는 어린이 병원에 기부할 헌책을 모으고 있습니다.
teacher|Our teacher gave us a helpful hint when we got stuck on the puzzle.|우리가 퍼즐을 풀다 막혔을 때 선생님이 도움이 되는 힌트를 주셨습니다.
student|Every student wrote one question for the guest speaker.|학생들은 각자 초청 강연자에게 할 질문을 하나씩 적었습니다.
friend|My friend saved me a seat, so we could work on the project together.|친구가 자리를 맡아 두어서 우리는 함께 과제를 할 수 있었습니다.
family|My family takes turns cooking dinner when everyone is home.|우리 가족은 모두 집에 있을 때 돌아가며 저녁을 준비합니다.
mother|My mother showed me how to make soup with the vegetables from our garden.|어머니는 정원에서 딴 채소로 수프를 만드는 법을 알려 주셨습니다.
father|My father checks the tire pressure before we leave on a long drive.|아버지는 장거리 운전을 떠나기 전에 타이어 공기압을 확인하십니다.
sister|My sister lent me her umbrella when the rain started after school.|방과 후 비가 내리기 시작하자 여동생이 우산을 빌려 주었습니다.
brother|My brother is saving his allowance to buy a used guitar.|남자 형제는 중고 기타를 사려고 용돈을 모으고 있습니다.
house|The old house has a blue door and a small garden in the back.|그 오래된 집에는 파란 문과 뒤편의 작은 정원이 있습니다.
room|Please leave your shoes by the door so the room stays clean.|방을 깨끗하게 유지할 수 있도록 신발은 문 옆에 두세요.
door|Someone knocked on the door just as we sat down to eat.|우리가 막 식탁에 앉았을 때 누군가 문을 두드렸습니다.
window|We opened the window to let the cool evening air into the room.|저녁의 시원한 공기가 방 안으로 들어오도록 창문을 열었습니다.
table|We spread the map across the table and planned our bike route.|탁자 위에 지도를 펼쳐 놓고 자전거 경로를 계획했습니다.
chair|Grandpa pulled up a chair so he could read beside the fireplace.|할아버지는 벽난로 옆에서 책을 읽으려고 의자를 끌어오셨습니다.
bed|After the long hike, everyone was ready to go to bed early.|긴 하이킹을 마친 뒤 모두 일찍 잠자리에 들고 싶어 했습니다.
water|Bring a bottle of water because the trail has no drinking fountain.|산책로에는 식수대가 없으니 물 한 병을 가져오세요.
milk|She poured milk into the bowl before adding the cereal.|그녀는 시리얼을 넣기 전에 그릇에 우유를 부었습니다.
bread|We toasted the bread and topped it with eggs for breakfast.|아침으로 빵을 구워 달걀을 얹어 먹었습니다.
rice|Dad added a little water to the rice before turning on the cooker.|아빠는 밥솥을 켜기 전에 쌀에 물을 조금 더 넣으셨습니다.
egg|I cracked an egg into the pan and stirred it until it was fluffy.|달걀을 프라이팬에 깨 넣고 부드러워질 때까지 저었습니다.
food|The food at the market smelled so good that we stopped for lunch.|시장 음식 냄새가 너무 좋아서 우리는 점심을 먹으러 멈췄습니다.
cat|Our cat waits by the window whenever it hears birds outside.|우리 고양이는 밖에서 새소리가 들릴 때마다 창가에서 기다립니다.
dog|The dog carried its ball back to Leo and wagged its tail.|개는 공을 레오에게 물어다 주고 꼬리를 흔들었습니다.
bird|A small bird built its nest in the tree outside my bedroom.|작은 새 한 마리가 내 침실 밖 나무에 둥지를 틀었습니다.
fish|We watched the fish swim beneath the bridge at the park.|공원 다리 아래에서 물고기들이 헤엄치는 모습을 지켜봤습니다.
horse|The horse slowed down when the path became rocky.|길이 울퉁불퉁해지자 말은 속도를 늦췄습니다.
tree|We rested in the shade of a tree while we ate our lunch.|점심을 먹으며 나무 그늘에서 쉬었습니다.
flower|A yellow flower opened beside the fence after the rain.|비가 온 뒤 울타리 옆에 노란 꽃이 피었습니다.
sun|The sun came out, and the wet playground began to dry.|해가 나자 젖었던 운동장이 마르기 시작했습니다.
moon|The moon looked bright above the lake, even though it was cloudy.|구름이 꼈는데도 호수 위의 달은 밝아 보였습니다.
star|We found the North Star by following the map in our book.|책에 있는 지도를 따라 북극성을 찾았습니다.
sky|The sky turned orange as the sun went down behind the hills.|해가 언덕 너머로 지면서 하늘이 주황빛으로 변했습니다.
rain|The rain filled the garden barrel, so we saved water for the plants.|비가 정원 물통을 채워서 식물에 쓸 물을 모았습니다.
snow|Fresh snow covered the path, and our footprints showed where we had walked.|새로 내린 눈이 길을 덮어 우리가 걸어간 자리에 발자국이 남았습니다.
wind|The strong wind blew my hat off, and it landed beside the fence.|강한 바람에 모자가 날아가 울타리 옆에 떨어졌습니다.
day|We spent the day at the beach and came home before sunset.|해변에서 하루를 보내고 해가 지기 전에 집에 돌아왔습니다.
night|The campsite grew quiet at night, except for the sound of crickets.|밤이 되자 캠핑장은 귀뚜라미 소리만 빼고 조용해졌습니다.
morning|I pack my lunch the night before so my morning is less rushed.|아침에 서두르지 않도록 전날 밤 도시락을 챙겨 둡니다.
time|We left with plenty of time, so we did not have to hurry to the station.|시간 여유를 두고 출발해서 역까지 서두를 필요가 없었습니다.
year|This year, our class is growing tomatoes for the school garden.|올해 우리 반은 학교 텃밭에서 토마토를 기르고 있습니다.
name|Write your name on the first page before you hand in the workbook.|학습지를 제출하기 전에 첫 페이지에 이름을 쓰세요.
hand|She raised her hand to answer the question about the story.|그녀는 이야기와 관련된 질문에 답하려고 손을 들었습니다.
head|Wear a helmet to protect your head when you ride your bike.|자전거를 탈 때 머리를 보호할 수 있도록 헬멧을 쓰세요.
eye|The doctor checked each eye with a small light during the exam.|진료 중 의사는 작은 조명으로 양쪽 눈을 검사했습니다.
face|He wiped the paint from his face before taking the class photo.|그는 학급 사진을 찍기 전에 얼굴에 묻은 페인트를 닦았습니다.
foot|I stepped on a sharp shell, so my foot hurt for the rest of the walk.|날카로운 조개껍데기를 밟아서 남은 산책 동안 발이 아팠습니다.
mouth|Cover your mouth when you cough, and wash your hands afterward.|기침할 때는 입을 가리고 나중에 손을 씻으세요.
leg|She stretched her leg gently after the soccer game.|그녀는 축구 경기 후 다리를 부드럽게 스트레칭했습니다.
car|We packed the car the night before our trip to avoid a morning rush.|아침에 서두르지 않도록 여행 전날 밤 차에 짐을 실었습니다.
bus|The bus was late, so the students waited together under the shelter.|버스가 늦게 와서 학생들은 정류장 지붕 아래서 함께 기다렸습니다.
train|We took the train because it was faster than driving through traffic.|교통 체증 속에서 운전하는 것보다 빨라서 기차를 탔습니다.
bike|I put a light on my bike so drivers can see me after dark.|어두워진 뒤 운전자들이 볼 수 있도록 자전거에 등을 달았습니다.
ball|The ball bounced over the fence, and Maya asked the neighbor to get it.|공이 울타리를 넘어가서 마야는 이웃에게 가져다 달라고 부탁했습니다.
game|Our team changed its strategy at halftime and won the game.|우리 팀은 하프타임에 전략을 바꾸고 경기에서 이겼습니다.
music|Soft music played in the café while we finished our homework.|우리가 숙제를 마치는 동안 카페에서는 잔잔한 음악이 흘렀습니다.
picture|She drew a picture of the mountain she could see from her window.|그녀는 창문에서 보이는 산의 그림을 그렸습니다.
toy|The toddler put each toy back in the box before bedtime.|아이는 잠자리에 들기 전에 장난감을 하나씩 상자에 넣었습니다.
box|The delivery box was too large to fit through the gate.|배달 상자는 너무 커서 대문을 통과할 수 없었습니다.
bag|I keep a spare snack in my bag in case practice runs late.|연습이 늦게 끝날 경우를 대비해 가방에 간식을 여분으로 넣어 둡니다.
cup|He warmed his hands around a cup of tea after coming in from the cold.|그는 추위를 피해 들어온 뒤 차 한 잔을 감싸 쥐고 손을 녹였습니다.
clock|The clock in the classroom is five minutes fast, so check the schedule.|교실 시계는 5분 빠르니 시간표를 확인하세요.
park|We walked through the park and watched the ducks near the pond.|공원을 걸으며 연못가의 오리들을 구경했습니다.
city|The city added a new bus route to connect the library and the hospital.|시는 도서관과 병원을 잇는 새 버스 노선을 만들었습니다.
garden|Grandma grows herbs in the garden and uses them in her cooking.|할머니는 정원에서 허브를 길러 요리에 사용하십니다.
street|Look both ways before you cross the street, even at the crosswalk.|횡단보도에서도 길을 건너기 전에 양쪽을 살펴보세요.
be|The room was quiet, but the children were excited about the science show.|방은 조용했지만 아이들은 과학 공연을 기대하며 신이 나 있었습니다.
have|We have enough chairs for everyone who is coming to dinner.|저녁 식사에 오는 모든 사람이 앉을 의자가 충분히 있습니다.
do|I do my science homework at the kitchen table after dinner.|저는 저녁 식사 후 식탁에서 과학 숙제를 합니다.
go|Let's go to the library before it closes at six.|도서관이 여섯 시에 문을 닫기 전에 같이 갑시다.
come|Come inside and warm up; the wind is getting colder.|안으로 들어와 몸을 녹이세요. 바람이 점점 차가워지고 있어요.
see|From the top of the hill, we could see the river winding through town.|언덕 꼭대기에서 강이 마을 사이로 굽이쳐 흐르는 모습이 보였습니다.
look|Look at the label before you add the medicine to the water.|약을 물에 넣기 전에 라벨을 확인하세요.
like|I like making paper airplanes and testing which one flies farthest.|저는 종이비행기를 만들어 어느 것이 가장 멀리 나는지 시험하는 것을 좋아합니다.
love|They love visiting their grandparents and hearing stories from the past.|그들은 조부모님을 찾아뵙고 옛날이야기를 듣는 것을 무척 좋아합니다.
want|I want to learn how to bake bread for the weekend picnic.|주말 소풍을 위해 빵 굽는 법을 배우고 싶습니다.
eat|We eat dinner together whenever everyone's schedule allows.|모두의 일정이 맞을 때마다 함께 저녁을 먹습니다.
drink|Drink some water before the race begins, not just after it ends.|경주가 끝난 뒤뿐 아니라 시작하기 전에 물을 마시세요.
make|We used cardboard and tape to make a model of the solar system.|우리는 판지와 테이프를 사용해 태양계 모형을 만들었습니다.
play|The children played outside until the streetlights came on.|아이들은 가로등이 켜질 때까지 밖에서 놀았습니다.
read|I read the recipe twice so I would not miss an important step.|중요한 순서를 놓치지 않으려고 조리법을 두 번 읽었습니다.
write|Please write your answer in a complete sentence, not just one word.|한 단어만 쓰지 말고 완전한 문장으로 답을 쓰세요.
run|We run around the track twice to warm up before practice.|우리는 연습 전에 몸을 풀려고 트랙을 두 바퀴 뜁니다.
walk|We walked home together because the weather was clear and mild.|날씨가 맑고 온화해서 함께 걸어서 집에 갔습니다.
talk|The two friends talked about their plans while they waited for the bus.|두 친구는 버스를 기다리며 앞으로의 계획에 관해 이야기했습니다.
say|Please say the new word slowly so everyone can hear it clearly.|모두 잘 들을 수 있도록 새 단어를 천천히 말해 주세요.
listen|Listen to the instructions first, then open the envelope on your desk.|먼저 안내를 들은 다음 책상 위 봉투를 여세요.
hear|I could hear the school band practicing from the playground.|운동장에서 학교 악단이 연습하는 소리가 들렸습니다.
help|Could you help me carry these books to the classroom?|이 책들을 교실까지 옮기는 것을 도와줄 수 있나요?
open|Open the window a little if the room feels too warm.|방이 너무 더우면 창문을 조금 여세요.
close|Close the gate behind you so the dog stays in the yard.|개가 마당에 있도록 뒤에서 대문을 닫아 주세요.
give|Please give your permission slip to the teacher by Friday.|금요일까지 동의서를 선생님께 제출하세요.
take|Take an umbrella in case the weather changes this afternoon.|오늘 오후 날씨가 바뀔 수 있으니 우산을 가져가세요.
get|We got to the station early and bought snacks for the ride.|역에 일찍 도착해 기차에서 먹을 간식을 샀습니다.
know|I know the answer because we studied this example yesterday.|어제 이 예문을 공부해서 정답을 알고 있습니다.
think|Think carefully before you choose which topic to research.|조사할 주제를 고르기 전에 신중하게 생각하세요.
learn|We learned how bees help flowers grow during our garden lesson.|텃밭 수업에서 벌이 꽃의 성장을 돕는 방법을 배웠습니다.
study|Nora studies in short sessions and takes a quick break between them.|노라는 짧게 나누어 공부하고 중간마다 잠깐씩 쉽니다.
work|My parents work at different hospitals, but they ride the bus together.|부모님은 서로 다른 병원에서 일하시지만 버스는 함께 타십니다.
sleep|The baby fell asleep as soon as the car started moving.|차가 움직이기 시작하자 아기는 곧 잠들었습니다.
sit|We sat near the window so we could watch the rain.|비를 볼 수 있도록 창가 근처에 앉았습니다.
stand|Please stand behind the yellow line while the train arrives.|기차가 들어오는 동안 노란 선 뒤에 서 주세요.
buy|We bought fresh peaches at the farmers' market on Saturday.|토요일에 농산물 시장에서 신선한 복숭아를 샀습니다.
find|I found my missing key under the notebook on my desk.|책상 위 공책 아래에서 잃어버린 열쇠를 찾았습니다.
live|My cousins live near the coast, so they can walk to the beach.|사촌들은 해안 근처에 살아서 해변까지 걸어갈 수 있습니다.
call|Call me when you reach the library, and I will meet you outside.|도서관에 도착하면 전화하세요. 밖에서 만날게요.
good|This is a good place to watch the sunset because the hill faces west.|이 언덕은 서쪽을 향해 있어 해넘이를 보기 좋은 장소입니다.
bad|Leaving food outside is a bad idea because it attracts insects.|음식을 밖에 두면 벌레가 꼬이므로 좋은 생각이 아닙니다.
big|A big wave pushed the empty boat back toward the shore.|큰 파도가 빈 배를 다시 해안 쪽으로 밀었습니다.
small|We found a small shell tucked between two rocks.|두 바위 사이에 끼어 있는 작은 조개껍데기를 찾았습니다.
long|The long bridge crosses the river and connects the two villages.|그 긴 다리는 강을 건너 두 마을을 이어 줍니다.
short|The movie was short, but its ending gave us a lot to discuss.|영화는 짧았지만 결말에 관해 이야기할 거리가 많았습니다.
new|Our new neighbor introduced herself and invited us to her garden.|새 이웃이 자신을 소개하고 우리를 정원에 초대했습니다.
old|We found an old map in a drawer at my grandfather's house.|할아버지 댁 서랍에서 오래된 지도를 발견했습니다.
young|The young puppy stayed close to its mother in the noisy park.|어린 강아지는 시끄러운 공원에서 어미 곁에 붙어 있었습니다.
happy|Mia was happy when her class chose her story for the school paper.|반 친구들이 학교 신문에 실을 이야기로 미아의 글을 골라 미아는 기뻤습니다.
sad|He felt sad when the team had to cancel its trip because of the storm.|폭풍 때문에 팀 여행이 취소되자 그는 슬펐습니다.
nice|It was nice of our neighbor to bring soup when Dad was sick.|아빠가 아프실 때 이웃이 수프를 가져다주어 고마웠습니다.
kind|The kind librarian helped the child find a book about dinosaurs.|친절한 사서가 아이가 공룡 책을 찾도록 도와주었습니다.
funny|The comedian told a funny story that made the whole room laugh.|코미디언이 재미있는 이야기를 해서 방 안의 모든 사람이 웃었습니다.
easy|The first question was easy, but the last one took us ten minutes.|첫 번째 문제는 쉬웠지만 마지막 문제를 푸는 데는 10분이 걸렸습니다.
hard|The ground was hard after a week without rain.|일주일 동안 비가 오지 않아 땅이 딱딱했습니다.
hot|The soup was too hot to eat, so we let it cool for a few minutes.|수프가 너무 뜨거워서 몇 분 동안 식혔습니다.
cold|My hands felt cold after I forgot my gloves at home.|장갑을 집에 두고 와서 손이 추웠습니다.
warm|A warm blanket made the chilly evening much more comfortable.|따뜻한 담요 덕분에 쌀쌀한 저녁이 훨씬 편안해졌습니다.
cool|We sat under a tree to stay cool while the sun was high.|해가 높이 떠 있는 동안 시원하게 있으려고 나무 아래 앉았습니다.
fast|The fast train reaches the next city in less than an hour.|급행열차는 한 시간도 안 되어 다음 도시에 도착합니다.
slow|The slow elevator stopped at every floor on the way up.|느린 엘리베이터는 올라가는 동안 층마다 멈췄습니다.
clean|Wash the clean jars before you fill them with homemade jam.|깨끗한 병에 직접 만든 잼을 담기 전에 병을 씻으세요.
dirty|His shoes were dirty after he helped plant trees in the field.|들판에 나무 심는 일을 돕고 나서 그의 신발은 더러워졌습니다.
beautiful|We watched a beautiful sunset from the path above the beach.|해변 위쪽 산책로에서 아름다운 해넘이를 바라봤습니다.
pretty|A pretty blue ribbon held her hair away from her face.|예쁜 파란 리본이 그녀의 머리카락을 얼굴에서 떨어지게 묶어 주었습니다.
strong|The strong rope held the tent in place during the windy night.|튼튼한 밧줄이 바람 부는 밤 동안 텐트를 단단히 고정했습니다.
weak|After the flu, he felt too weak to carry his school bag.|독감을 앓고 난 뒤 그는 책가방을 들기도 힘들 만큼 기운이 없었습니다.
hungry|We were hungry after practice, so we shared sandwiches on the bus.|연습 후 배가 고파 버스에서 샌드위치를 나눠 먹었습니다.
tired|I felt tired after the long walk, but the view was worth it.|오래 걸어 피곤했지만 경치는 그럴 만한 가치가 있었습니다.
`;

  const additionalCuratedExampleData = `
animal|The wildlife center cared for an injured animal until it could return to the forest.|야생동물 보호소는 다친 동물이 숲으로 돌아갈 수 있을 때까지 돌봤습니다.
country|She learned how people in that country celebrate the first day of spring.|그녀는 그 나라 사람들이 봄의 첫날을 어떻게 기념하는지 배웠습니다.
language|Knowing another language helped Luis talk with his new neighbors.|외국어를 아는 덕분에 루이스는 새 이웃들과 이야기할 수 있었습니다.
world|News from around the world was discussed in our social studies class.|우리 사회 수업에서는 세계 곳곳의 뉴스를 토론했습니다.
people|Many people brought reusable bags to the neighborhood market.|많은 사람이 동네 시장에 재사용 가방을 가져왔습니다.
person|The first person to finish the puzzle checked the answer for everyone.|퍼즐을 가장 먼저 푼 사람이 모두를 위해 답을 확인했습니다.
place|We found a quiet place near the lake to eat our lunch.|호수 근처에서 점심을 먹을 조용한 장소를 찾았습니다.
problem|Instead of blaming each other, the team worked together to solve the problem.|서로를 탓하는 대신 팀은 문제를 해결하려고 힘을 합쳤습니다.
question|Her question about the experiment helped the class notice a missing step.|실험에 관한 그녀의 질문 덕분에 반 친구들은 빠진 단계를 발견했습니다.
answer|The answer was hidden in the final paragraph, not in the chart.|정답은 도표가 아니라 마지막 문단에 숨겨져 있었습니다.
idea|Jamal had the idea of turning the empty lot into a community garden.|자말은 빈터를 공동체 텃밭으로 바꾸자는 아이디어를 냈습니다.
story|Grandpa told us a story about the first time he saw the ocean.|할아버지는 처음 바다를 보셨을 때의 이야기를 들려주셨습니다.
word|I looked up the word in a dictionary because its meaning was unclear.|뜻이 분명하지 않아 사전에서 그 단어를 찾아봤습니다.
letter|She wrote a letter to thank the volunteers who cleaned the beach.|그녀는 해변 청소를 도운 자원봉사자들에게 감사 편지를 썼습니다.
number|Write the number of each page in the top-right corner.|각 페이지의 번호를 오른쪽 위 모서리에 적으세요.
example|The teacher gave an example that showed how to use the new rule.|선생님은 새 규칙을 어떻게 쓰는지 보여 주는 예를 들었습니다.
reason|The reason the plants wilted was that no one watered them over the weekend.|식물이 시든 이유는 주말 동안 아무도 물을 주지 않았기 때문이었습니다.
result|The result of the survey surprised us because most students preferred walking.|대부분의 학생이 걷는 것을 더 좋아해 설문 결과는 우리를 놀라게 했습니다.
change|A small change to the schedule gave everyone more time for lunch.|일정을 조금 바꾸자 모두에게 점심시간이 더 생겼습니다.
minute|The bus will arrive in five minutes, so we should wait by the stop.|버스가 5분 후에 도착하니 정류장에서 기다리는 게 좋겠습니다.
hour|After an hour of practice, the band could play the song without stopping.|한 시간 연습한 뒤 악단은 멈추지 않고 곡을 연주할 수 있었습니다.
week|We visit the library once a week to choose books for our reading group.|독서 모임에서 읽을 책을 고르러 일주일에 한 번 도서관에 갑니다.
month|The club raised enough money in one month to buy new sports equipment.|동아리는 한 달 만에 새 운동 장비를 살 만큼의 돈을 모았습니다.
holiday|During the winter holiday, we stayed with our cousins in the mountains.|겨울 방학 동안 산에 사는 사촌 집에서 지냈습니다.
weather|The weather changed quickly, so we moved the picnic indoors.|날씨가 갑자기 바뀌어 소풍 장소를 실내로 옮겼습니다.
season|Each season brings a different kind of bird to the wetlands.|계절마다 습지에 찾아오는 새의 종류가 달라집니다.
spring|In spring, the students plant vegetables and watch them grow.|봄이 되면 학생들은 채소를 심고 자라는 모습을 지켜봅니다.
summer|We swim in the lake during summer, when the water is warmest.|물이 가장 따뜻한 여름에 호수에서 수영합니다.
autumn|In autumn, the leaves turn red and gold along the mountain road.|가을이 되면 산길을 따라 나뭇잎이 빨갛고 노랗게 물듭니다.
winter|The roads can become slippery in winter, so the driver slowed down.|겨울에는 도로가 미끄러워질 수 있어 운전자가 속도를 줄였습니다.
river|The river rose after heavy rain, and the town closed the path beside it.|폭우 뒤 강물이 불어나자 마을은 강변 산책로를 폐쇄했습니다.
mountain|We started climbing the mountain before sunrise to avoid the afternoon heat.|오후 더위를 피하려고 해 뜨기 전에 산을 오르기 시작했습니다.
beach|We collected plastic bottles from the beach before the tide came in.|밀물이 들어오기 전에 해변에서 플라스틱병을 주웠습니다.
forest|A marked trail leads through the forest to a small waterfall.|표지된 산책로를 따라 숲을 지나면 작은 폭포가 나옵니다.
island|The family took a ferry to the island and rented bicycles there.|가족은 배를 타고 섬으로 가서 자전거를 빌렸습니다.
ocean|Scientists study the ocean to understand how its temperature is changing.|과학자들은 바닷물 온도가 어떻게 변하는지 알아보려고 대양을 연구합니다.
earth|Plants need sunlight, water, and healthy soil from the earth to grow.|식물이 자라려면 햇빛과 물, 땅에서 얻는 건강한 흙이 필요합니다.
plant|This plant grows best near a sunny window and needs water twice a week.|이 식물은 햇볕이 잘 드는 창가에서 가장 잘 자라며 일주일에 두 번 물을 줘야 합니다.
health|Regular sleep and exercise can make a big difference to your health.|규칙적인 수면과 운동은 건강에 큰 차이를 가져올 수 있습니다.
hospital|The new hospital has a quiet room where families can rest.|새 병원에는 가족들이 쉴 수 있는 조용한 방이 있습니다.
doctor|The doctor listened to my breathing and asked when the cough began.|의사는 제 호흡을 듣고 기침이 언제 시작됐는지 물었습니다.
medicine|Take this medicine with food, unless your doctor tells you otherwise.|의사가 달리 지시하지 않았다면 이 약은 음식과 함께 복용하세요.
computer|I saved my project on the computer before the battery ran out.|배터리가 다 되기 전에 컴퓨터에 과제를 저장했습니다.
internet|The school uses the internet to share homework with families.|학교는 인터넷을 통해 가정에 숙제를 안내합니다.
email|I sent an email to the museum to ask about its opening hours.|박물관 개관 시간을 물어보려고 이메일을 보냈습니다.
phone|My phone battery was low, so I used the map at the station instead.|휴대전화 배터리가 부족해 역에 있는 지도를 대신 사용했습니다.
office|The office closes at five, but the library stays open later.|사무실은 다섯 시에 문을 닫지만 도서관은 더 늦게까지 엽니다.
store|We compared prices at two stores before buying the backpack.|배낭을 사기 전에 두 가게의 가격을 비교했습니다.
market|At the market, the farmer explained how she grew the strawberries.|시장에서 농부는 딸기를 어떻게 길렀는지 설명해 주었습니다.
money|He put some money aside each week to pay for his art class.|그는 미술 수업료를 내려고 매주 돈을 조금씩 모았습니다.
price|The price of the bus ticket includes a transfer to the subway.|버스 요금에는 지하철 환승 비용이 포함되어 있습니다.
job|Her first job at the bakery taught her how to serve customers.|빵집에서 한 첫 일은 그녀에게 손님 응대법을 가르쳐 주었습니다.
vacation|We planned a quiet vacation so everyone could rest after exams.|시험이 끝난 뒤 모두 쉴 수 있도록 조용한 휴가를 계획했습니다.
festival|At the town festival, local musicians performed beside the food stalls.|마을 축제에서 지역 음악가들이 음식 가판대 옆에서 공연했습니다.
museum|The museum lets visitors handle objects that are safe to touch.|그 박물관에서는 만져도 되는 유물을 관람객이 직접 다뤄 볼 수 있습니다.
library|The library set up a reading corner for children near the window.|도서관은 창가에 어린이용 독서 공간을 마련했습니다.
science|Our science project tested which soil helped bean seeds grow fastest.|우리 과학 과제는 어떤 흙에서 콩 씨앗이 가장 빨리 자라는지 시험했습니다.
history|The guide explained how the old bridge changed the town's history.|안내자는 오래된 다리가 마을의 역사를 어떻게 바꾸었는지 설명했습니다.
art|The students used recycled paper to create art for the school hallway.|학생들은 재활용 종이로 학교 복도에 전시할 예술 작품을 만들었습니다.
energy|Turning off unused lights saves energy at home and at school.|사용하지 않는 조명을 끄면 집과 학교에서 에너지를 절약할 수 있습니다.
ask|Before we left, I asked the guide where the mountain trail began.|출발하기 전에 산길이 어디서 시작하는지 안내자에게 물었습니다.
begin|The movie will begin as soon as everyone finds a seat.|모두 자리를 찾으면 영화가 시작됩니다.
believe|I believe her story because she showed us the photograph she took.|그녀가 직접 찍은 사진을 보여 주어서 그 이야기를 믿습니다.
bring|Please bring your library card so you can borrow the book today.|오늘 책을 빌릴 수 있도록 도서관 카드를 가져오세요.
build|The volunteers will build a ramp so everyone can enter the garden.|누구나 정원에 들어올 수 있도록 자원봉사자들이 경사로를 만들 예정입니다.
carry|He carried the groceries upstairs while his sister opened the door.|여동생이 문을 여는 동안 그는 식료품을 위층으로 날랐습니다.
choose|You can choose either the blue folder or the green one for your report.|보고서에 파란색 폴더나 초록색 폴더 중 하나를 고르면 됩니다.
climb|We climbed the steps slowly and stopped to admire the view.|천천히 계단을 올라가며 멈춰 서서 경치를 감상했습니다.
decide|After comparing both routes, we decided to take the train.|두 경로를 비교한 뒤 기차를 타기로 결정했습니다.
draw|The map helped us draw a clear route from the school to the park.|지도를 참고해 학교에서 공원까지 가는 경로를 명확하게 그렸습니다.
drive|My aunt drives carefully when the road is wet or icy.|이모는 도로가 젖거나 얼었을 때 조심해서 운전합니다.
enjoy|We enjoyed the concert because the musicians invited the audience to sing.|음악가들이 관객에게 함께 노래하자고 해서 공연을 즐겁게 보았습니다.
explain|Could you explain why the plants need sunlight to grow?|식물이 자라는 데 햇빛이 필요한 이유를 설명해 주시겠어요?
feel|I feel more confident speaking English after practicing with my partner.|짝과 연습한 뒤 영어로 말하는 데 자신감이 더 생겼습니다.
finish|She finished her science report early and helped her partner check his.|그녀는 과학 보고서를 일찍 끝내고 짝의 보고서 확인을 도왔습니다.
follow|Follow the blue signs through the station to find the museum exit.|역 안의 파란 표지판을 따라가면 박물관 출구가 나옵니다.
forget|Don't forget to return the keys to the front desk before you leave.|떠나기 전에 열쇠를 안내 데스크에 돌려주는 것을 잊지 마세요.
grow|The young trees grew quickly after the community planted them by the river.|주민들이 강가에 심은 어린 나무들은 빠르게 자랐습니다.
hope|We hope the rain stops before the outdoor concert begins.|야외 음악회가 시작하기 전에 비가 그치기를 바랍니다.
invite|They invited their new neighbors to join them for dinner.|그들은 새 이웃들을 저녁 식사에 초대했습니다.
join|Several students joined the cleanup after they saw the littered beach.|쓰레기가 널린 해변을 본 학생 몇 명이 정화 활동에 참여했습니다.
keep|Keep your ticket until the end of the trip in case an inspector asks.|검표원이 확인할 수도 있으니 여행이 끝날 때까지 표를 가지고 계세요.
leave|We left the campsite cleaner than we found it.|우리는 캠핑장을 처음 왔을 때보다 더 깨끗하게 정리하고 떠났습니다.
meet|Let's meet beside the information desk at half past two.|두 시 반에 안내 데스크 옆에서 만납시다.
move|The family moved closer to the school so the children could walk.|아이들이 걸어 다닐 수 있도록 가족은 학교 가까이로 이사했습니다.
need|You need a helmet and a light to ride safely after sunset.|해가 진 뒤 안전하게 자전거를 타려면 헬멧과 등이 필요합니다.
order|We ordered vegetable soup because it was the warmest meal on the menu.|메뉴 중 가장 따뜻한 음식이라 채소 수프를 주문했습니다.
pass|The hikers passed a small waterfall before reaching the campsite.|등산객들은 캠핑장에 도착하기 전에 작은 폭포를 지나갔습니다.
practice|Our choir practices twice a week before the spring concert.|우리 합창단은 봄 음악회를 앞두고 일주일에 두 번 연습합니다.
remember|I remember visiting this museum with my grandmother when I was little.|어렸을 때 할머니와 이 박물관을 방문했던 기억이 납니다.
send|Please send me the address so I can find the meeting place.|모임 장소를 찾을 수 있도록 주소를 보내 주세요.
show|The guide showed us a photograph of the village before the bridge was built.|안내자는 다리가 놓이기 전 마을 사진을 보여 주었습니다.
spend|We spent the afternoon making signs for the neighborhood cleanup.|오후 내내 동네 청소에 쓸 표지판을 만들었습니다.
start|The runners started slowly and saved their energy for the final lap.|달리기 선수들은 천천히 출발해 마지막 바퀴를 위해 힘을 아꼈습니다.
teach|My grandfather taught me to recognize birds by their songs.|할아버지는 새들의 노래로 새를 알아보는 법을 가르쳐 주셨습니다.
travel|They traveled by train so they could enjoy the scenery along the coast.|해안 풍경을 즐기려고 기차를 타고 여행했습니다.
try|If the first recipe is too spicy, try adding a little yogurt.|첫 번째 조리법이 너무 매콤하면 요구르트를 조금 넣어 보세요.
understand|The diagram made it easier to understand how the water cycle works.|도표 덕분에 물의 순환이 어떻게 이루어지는지 이해하기 쉬웠습니다.
visit|We visited the history museum to learn about the town's first settlers.|마을의 초기 정착민에 대해 배우려고 역사 박물관을 방문했습니다.
wait|We waited under the station roof until the rain became lighter.|비가 잦아들 때까지 역 지붕 아래에서 기다렸습니다.
wear|Wear comfortable shoes because the museum tour lasts two hours.|박물관 관람이 두 시간 동안 이어지니 편한 신발을 신으세요.
win|Our class won the garden contest because every student helped.|학생 모두가 힘을 보태 우리 반이 정원 대회에서 우승했습니다.
wish|I wish you good luck in the spelling contest tomorrow.|내일 철자 대회에서 행운을 빌어요.
borrow|May I borrow your ruler to draw a straight line on my map?|지도에 곧은 선을 그리게 자를 빌려도 될까요?
return|Please return the camera to the desk after you finish taking pictures.|사진을 다 찍은 뒤 카메라를 데스크에 돌려주세요.
share|The neighbors shared their garden tools so everyone could plant flowers.|이웃들은 모두 꽃을 심을 수 있도록 정원 도구를 함께 사용했습니다.
afraid|The child was afraid of the dark hallway, so her brother walked with her.|아이는 어두운 복도를 무서워해서 오빠가 함께 걸어 주었습니다.
angry|Dad was angry when he saw the broken window, but he listened to our explanation.|아빠는 깨진 창문을 보고 화가 나셨지만 우리의 설명을 들어 주셨습니다.
bright|The bright classroom made it easy to read the map on the wall.|교실이 밝아서 벽에 걸린 지도를 읽기 쉬웠습니다.
careful|Be careful with the glass jar because it is full of hot soup.|유리병에 뜨거운 수프가 가득하니 조심해서 다루세요.
careless|A careless mistake on the map sent us to the wrong entrance.|지도에 표시를 잘못하는 바람에 우리는 엉뚱한 입구로 갔습니다.
comfortable|These comfortable shoes kept my feet from hurting on the long walk.|이 편한 신발 덕분에 오래 걸어도 발이 아프지 않았습니다.
dangerous|It is dangerous to swim here when the current is strong.|물살이 강할 때 이곳에서 수영하는 것은 위험합니다.
different|The two birds look similar, but their songs sound different.|두 새는 비슷해 보이지만 노랫소리는 다릅니다.
difficult|The last question was difficult, so we checked the example in our notes.|마지막 문제는 어려워서 노트에 있는 예를 확인했습니다.
excited|The children were excited to see their drawings displayed at the museum.|아이들은 자신들의 그림이 박물관에 전시된 것을 보고 신이 났습니다.
famous|The town is famous for its spring festival and handmade kites.|그 마을은 봄 축제와 수제 연로 유명합니다.
friendly|Our friendly guide answered every question during the forest walk.|친절한 안내자는 숲길을 걷는 동안 모든 질문에 답해 주었습니다.
healthy|A healthy lunch with vegetables helped us stay focused in class.|채소가 든 건강한 점심을 먹으니 수업에 집중하기 좋았습니다.
important|It is important to check the weather before planning a mountain hike.|산행을 계획하기 전에 날씨를 확인하는 것이 중요합니다.
interesting|The museum's map showed an interesting path through the old neighborhood.|박물관 지도에는 옛 동네를 지나는 흥미로운 길이 표시되어 있었습니다.
popular|That hiking trail is popular, so we arrived early to find a parking spot.|그 하이킹 코스는 인기가 많아 주차 자리를 찾으려고 일찍 도착했습니다.
quiet|We found a quiet corner of the library to practice our presentation.|발표 연습을 하려고 도서관의 조용한 구석을 찾았습니다.
ready|The students were ready to begin as soon as the bell rang.|종이 울리자 학생들은 바로 시작할 준비가 되어 있었습니다.
rich|The rich soil near the river helps the vegetables grow well.|강 근처의 비옥한 흙은 채소가 잘 자라도록 돕습니다.
safe|The children stayed in a safe area while the workers repaired the road.|작업자들이 도로를 수리하는 동안 아이들은 안전한 구역에 머물렀습니다.
same|We took the same trail home, but the sunset made it look different.|같은 산책로로 돌아왔지만 해넘이 때문에 길이 다르게 보였습니다.
special|Our class made a special card for the librarian who was retiring.|우리 반은 퇴직하는 사서 선생님을 위해 특별한 카드를 만들었습니다.
surprised|I was surprised to find a note from my friend inside the library book.|도서관 책 안에서 친구의 쪽지를 발견해 놀랐습니다.
surprising|The most surprising part of the trip was seeing dolphins near the boat.|여행에서 가장 놀라웠던 것은 배 근처에서 돌고래를 본 일이었습니다.
useful|The pocket map was useful when my phone lost its signal.|휴대전화 신호가 끊겼을 때 주머니에 넣은 지도가 유용했습니다.
usual|Unlike our usual route, this path passes through the old market.|평소 다니던 길과 달리 이 경로는 옛 시장을 통과합니다.
wonderful|We had a wonderful view of the valley from the top of the trail.|산책로 꼭대기에서 계곡의 멋진 풍경을 볼 수 있었습니다.
worried|Mom was worried when the bus did not arrive at its usual time.|버스가 평소 시간에 오지 않자 엄마는 걱정하셨습니다.
local|The local bakery uses apples grown on farms outside the town.|그 지역 빵집은 마을 외곽 농장에서 재배한 사과를 사용합니다.
necessary|A ticket is necessary to enter the concert hall.|음악회장에 들어가려면 표가 필요합니다.
possible|It is possible to finish the project today if we divide the work.|일을 나누어 하면 오늘 과제를 끝내는 것이 가능합니다.
simple|The instructions were simple enough for everyone to follow.|설명이 누구나 따라 할 수 있을 만큼 간단했습니다.
terrible|A terrible storm knocked down branches and blocked the road.|심한 폭풍이 나뭇가지를 쓰러뜨리고 도로를 막았습니다.
thirsty|After the long bike ride, we were thirsty and stopped for water.|자전거를 오래 탄 뒤 목이 말라 물을 마시려고 멈췄습니다.
`;

  const advancedCuratedExampleData = `
ability|Her ability to explain difficult ideas helped the younger students understand the lesson.|어려운 생각을 설명하는 그녀의 능력 덕분에 어린 학생들이 수업을 이해할 수 있었습니다.
advantage|One advantage of taking the train is that you can read instead of watching the road.|기차를 타면 길을 보는 대신 책을 읽을 수 있다는 장점이 있습니다.
attention|The guide asked everyone to pay attention before the boat left the dock.|배가 선착장을 떠나기 전에 안내자는 모두에게 주의를 기울여 달라고 했습니다.
behavior|The teacher praised the class for its respectful behavior during the guest's talk.|선생님은 초청 강연 중 예의 바르게 행동한 반을 칭찬하셨습니다.
challenge|Learning to speak in front of a crowd was a challenge, but she kept practicing.|많은 사람 앞에서 말하는 것은 어려운 일이었지만 그녀는 계속 연습했습니다.
choice|You have a choice between joining the art club and helping with the school newspaper.|미술 동아리에 가입하거나 학교 신문 제작을 도울 수 있습니다.
community|The community came together to repair the playground after the storm.|폭풍이 지나간 뒤 주민들이 힘을 모아 놀이터를 수리했습니다.
condition|The old bridge is still in good condition because workers inspect it every year.|작업자들이 매년 점검하기 때문에 오래된 다리는 아직 상태가 좋습니다.
culture|The festival introduced visitors to the music and culture of the island.|축제는 방문객들에게 그 섬의 음악과 문화를 소개했습니다.
decision|After reviewing the costs, the committee made a decision to repair the roof.|비용을 검토한 뒤 위원회는 지붕을 수리하기로 결정했습니다.
development|The development of a new battery made the electric bus cheaper to operate.|새 배터리의 개발로 전기 버스의 운행 비용이 낮아졌습니다.
education|A good education can help people make informed choices throughout their lives.|좋은 교육은 사람들이 평생에 걸쳐 충분한 정보를 바탕으로 선택하도록 도울 수 있습니다.
effect|The new lights had an immediate effect on how safe the path felt at night.|새 조명은 밤길이 얼마나 안전하게 느껴지는지에 즉각적인 영향을 주었습니다.
environment|Carrying a reusable bottle is a simple way to help protect the environment.|재사용 물병을 가지고 다니는 것은 환경을 보호하는 간단한 방법입니다.
experience|Volunteering at the animal shelter was an experience that changed how he saw pets.|동물 보호소 봉사는 그가 반려동물을 바라보는 방식을 바꿔 놓은 경험이었습니다.
fact|Before sharing the article, check each fact against a reliable source.|그 기사를 공유하기 전에 각 사실을 신뢰할 수 있는 출처와 대조해 보세요.
freedom|The students had the freedom to choose a topic that mattered to them.|학생들은 자신에게 중요한 주제를 자유롭게 고를 수 있었습니다.
government|The government announced a plan to make public buses more accessible.|정부는 대중교통 버스의 접근성을 높일 계획을 발표했습니다.
knowledge|Her knowledge of local birds helped the group identify the call in the trees.|지역 새에 대한 그녀의 지식 덕분에 일행은 나무에서 나는 울음소리의 주인을 알아냈습니다.
memory|The smell of cinnamon brought back a memory of baking with my grandmother.|계피 향은 할머니와 함께 빵을 굽던 기억을 떠올리게 했습니다.
opportunity|The summer program gave him an opportunity to study marine life up close.|여름 프로그램은 그에게 해양 생물을 가까이서 연구할 기회를 주었습니다.
opinion|In my opinion, the city should add more trees along busy streets.|제 생각에는 시에서 번화한 거리 주변에 나무를 더 심어야 합니다.
population|The population of the coastal town grows during the summer tourist season.|해안 마을의 인구는 여름 관광철에 늘어납니다.
purpose|The purpose of the survey was to learn how students travel to school.|설문 조사의 목적은 학생들이 어떻게 학교에 다니는지 알아보는 것이었습니다.
quality|We checked the quality of the water before opening the beach to swimmers.|해수욕장을 개방하기 전에 물의 수질을 확인했습니다.
relationship|The relationship between sleep and concentration became clear in the study.|그 연구에서는 수면과 집중력 사이의 관계가 분명하게 드러났습니다.
research|The research team compared water samples from the river and the lake.|연구팀은 강과 호수에서 채취한 물 표본을 비교했습니다.
responsibility|Taking care of the class plants is a responsibility we share each week.|학급 식물을 돌보는 일은 우리가 매주 나누어 맡는 책임입니다.
society|A fair society gives people a chance to participate in decisions that affect them.|공정한 사회는 사람들에게 자신에게 영향을 미치는 결정에 참여할 기회를 줍니다.
technology|The museum uses technology to let visitors explore a virtual version of the ancient city.|박물관은 기술을 활용해 관람객이 고대 도시를 가상으로 둘러볼 수 있게 합니다.
tradition|It is a family tradition to make dumplings together before the new year.|새해 전에 가족이 함께 만두를 빚는 것이 우리 집의 전통입니다.
value|The old camera has little market value, but it is valuable to our family.|그 오래된 카메라는 시장 가치는 낮지만 우리 가족에게는 소중합니다.
violence|The school teaches students how to settle disagreements without violence.|학교에서는 학생들에게 폭력 없이 의견 충돌을 해결하는 법을 가르칩니다.
wildlife|The new road includes a tunnel so wildlife can cross beneath it safely.|야생동물이 안전하게 길 아래로 지나갈 수 있도록 새 도로에 터널을 만들었습니다.
resource|Clean water is a limited resource, so the town asks residents not to waste it.|깨끗한 물은 한정된 자원이므로 마을은 주민들에게 물을 아껴 달라고 요청합니다.
economy|Tourism supports the local economy by creating jobs at hotels and restaurants.|관광업은 호텔과 식당의 일자리를 만들어 지역 경제를 뒷받침합니다.
industry|The fishing industry changed after new rules were introduced to protect young fish.|어린 물고기를 보호하는 새 규정이 도입된 뒤 어업이 달라졌습니다.
material|The artist chose a light material that would be easy to carry to the exhibition.|작가는 전시장까지 옮기기 쉽도록 가벼운 재료를 골랐습니다.
method|This method saves water by delivering it directly to the roots of each plant.|이 방법은 식물의 뿌리에 직접 물을 보내 물을 절약합니다.
opposite|The pharmacy is on the opposite side of the street from the bus stop.|약국은 버스 정류장 맞은편에 있습니다.
achievement|Finishing the marathon was a major achievement after months of training.|몇 달 동안 훈련한 끝에 마라톤을 완주한 것은 큰 성취였습니다.
argument|Their argument ended when they checked the instructions and found the answer.|설명서를 확인해 답을 찾자 그들의 논쟁은 끝났습니다.
communication|Clear communication helped the rescue team coordinate its search.|명확한 의사소통 덕분에 구조대는 수색 작업을 조율할 수 있었습니다.
competition|She entered the science competition with a model of a water filter.|그녀는 정수기 모형을 만들어 과학 경연 대회에 참가했습니다.
consequence|One consequence of cutting down the trees was that the hillside began to erode.|나무를 베어 낸 결과 언덕의 흙이 침식되기 시작했습니다.
solution|The class found a solution by sharing the equipment instead of buying more.|반 학생들은 장비를 더 사는 대신 함께 사용해 해결책을 찾았습니다.
standard|The safety standard requires every cyclist to wear a helmet on the course.|안전 기준에 따라 코스에 있는 자전거 이용자는 모두 헬멧을 써야 합니다.
treatment|The doctor explained the treatment and answered the family's questions.|의사는 치료 방법을 설명하고 가족들의 질문에 답했습니다.
wealth|The country's wealth comes partly from the natural resources beneath its land.|그 나라의 부는 일부가 국토 아래에 있는 천연자원에서 나옵니다.
feature|The best feature of the new app is that it works without an internet connection.|새 앱의 가장 좋은 특징은 인터넷 연결 없이도 작동한다는 점입니다.
achieve|She achieved her goal by practicing a little every day instead of cramming.|그녀는 벼락치기 대신 매일 조금씩 연습해 목표를 이루었습니다.
affect|A late-night screen can affect how easily you fall asleep.|늦은 밤 화면을 보면 잠드는 데 영향을 받을 수 있습니다.
allow|The pass allows visitors to enter the garden more than once in a day.|이 이용권으로 방문객은 하루에 한 번 넘게 정원에 들어갈 수 있습니다.
appear|A rainbow appeared over the field after the afternoon shower.|오후에 소나기가 내린 뒤 들판 위로 무지개가 나타났습니다.
avoid|We took a side street to avoid the traffic near the stadium.|경기장 근처의 교통 체증을 피하려고 골목길로 갔습니다.
cause|Leaving the freezer door open can cause the food inside to thaw.|냉동실 문을 열어 두면 안에 있는 음식이 녹을 수 있습니다.
compare|The class compared two maps to see how the coastline had changed.|반 학생들은 해안선이 어떻게 달라졌는지 알아보려고 지도 두 장을 비교했습니다.
consider|Before choosing a college, consider the courses and the cost of living.|대학을 고르기 전에 전공 수업과 생활비를 고려하세요.
create|The students created a short video to explain how to sort household waste.|학생들은 가정 쓰레기 분리배출 방법을 설명하는 짧은 영상을 만들었습니다.
describe|Use specific details to describe what you observed during the experiment.|실험 중 관찰한 내용을 묘사할 때는 구체적인 세부 정보를 사용하세요.
develop|The team is developing a low-cost filter for communities without clean water.|그 팀은 깨끗한 물이 부족한 지역을 위해 저렴한 필터를 개발하고 있습니다.
discover|Researchers discovered a new nesting site while tracking the birds.|연구자들은 새들을 추적하다 새로운 둥지를 발견했습니다.
encourage|Her coach encouraged her to try again after the first attempt failed.|첫 시도가 실패한 뒤 코치는 그녀에게 다시 도전하라고 격려했습니다.
establish|The town established a fund to help families after the flood.|마을은 홍수 피해를 입은 가족을 돕기 위한 기금을 마련했습니다.
exist|Several species of wild orchids exist only in this mountain region.|야생 난초 몇 종은 이 산악 지역에만 서식합니다.
improve|Adding short breaks helped improve the students' focus during long lessons.|짧은 휴식 시간을 넣자 긴 수업 동안 학생들의 집중력이 향상되었습니다.
include|Please include the source of each photograph in your report.|보고서에 사진마다 출처를 표시하세요.
increase|The city planted shade trees to reduce the heat as summer temperatures increase.|여름 기온이 오르자 시는 더위를 줄이려고 그늘 나무를 심었습니다.
influence|Friends can influence the music we listen to and the hobbies we try.|친구들은 우리가 듣는 음악과 새로 해 보는 취미에 영향을 줄 수 있습니다.
involve|The project will involve students, teachers, and families from the neighborhood.|그 프로젝트에는 동네의 학생, 교사, 가족들이 참여할 예정입니다.
manage|She manages the community garden and keeps a schedule for watering.|그녀는 공동체 텃밭을 관리하며 물 주는 일정을 정리합니다.
offer|The library offers free computer classes for adults on Saturday mornings.|도서관은 토요일 아침마다 성인을 위한 무료 컴퓨터 수업을 제공합니다.
produce|This farm produces enough vegetables to supply three local schools.|이 농장은 지역 학교 세 곳에 공급할 만큼의 채소를 생산합니다.
protect|A fence protects the young trees from animals and passing bicycles.|울타리는 어린 나무를 동물과 자전거로부터 보호합니다.
provide|The guide provided each hiker with a map and an emergency contact number.|안내자는 등산객마다 지도와 비상 연락처를 제공했습니다.
realize|I realized I had taken the wrong bus when we reached the airport.|공항에 도착해서야 버스를 잘못 탔다는 것을 깨달았습니다.
reduce|Using both sides of each sheet can reduce the amount of paper we waste.|종이의 양면을 모두 사용하면 낭비되는 종이를 줄일 수 있습니다.
remain|Only a few seats remain, so please reserve yours before Friday.|남은 자리가 몇 개뿐이니 금요일 전에 예약해 주세요.
require|The application will require your address and a contact phone number.|신청서에는 주소와 연락 가능한 전화번호가 필요합니다.
respond|The company responded to customers' questions within one business day.|회사는 영업일 기준 하루 안에 고객 문의에 답변했습니다.
solve|The engineers solved the drainage problem by changing the slope of the path.|기술자들은 길의 경사를 바꾸어 배수 문제를 해결했습니다.
support|Local businesses supported the festival by donating food and supplies.|지역 업체들은 음식과 물품을 기부해 축제를 지원했습니다.
suggest|The report suggests taking the train because it produces less pollution.|보고서는 오염을 덜 일으키므로 기차를 이용하라고 제안합니다.
suppose|Suppose the power goes out; where can we find a flashlight?|정전이 된다고 가정해 봅시다. 손전등은 어디서 찾을 수 있을까요?
survive|Some desert plants survive for months with very little rain.|어떤 사막 식물은 비가 거의 오지 않아도 몇 달 동안 살아남습니다.
accept|The club accepts new members who can attend the weekly meetings.|그 동아리는 주간 모임에 참석할 수 있는 새 회원을 받습니다.
argue|The neighbors argued about the fence until they agreed to share the repair cost.|이웃들은 수리비를 함께 부담하기로 할 때까지 울타리 문제로 논쟁했습니다.
attend|More than a hundred families attended the school's open house.|백 가구가 넘는 가족이 학교 공개 행사에 참석했습니다.
communicate|The team used clear signals to communicate during the noisy field exercise.|팀원들은 시끄러운 야외 훈련 중 명확한 신호로 의사소통했습니다.
contribute|Each student contributed one idea to the class plan for reducing waste.|학생들은 쓰레기를 줄이기 위한 학급 계획에 각자 아이디어를 하나씩 보탰습니다.
aware|Many shoppers are aware that reusable bags help reduce plastic waste.|많은 소비자는 재사용 가방이 플라스틱 쓰레기를 줄이는 데 도움이 된다는 것을 알고 있습니다.
basic|The course teaches basic first-aid skills that can help in an emergency.|이 수업에서는 응급 상황에 도움이 되는 기본 응급처치 기술을 가르칩니다.
certain|Certain plants attract bees, while others are pollinated by the wind.|어떤 식물은 벌을 끌어들이고 다른 식물은 바람을 통해 수분됩니다.
common|It is common for the trail to be muddy after several days of rain.|비가 며칠 내린 뒤 산책로가 진흙탕이 되는 것은 흔한 일입니다.
complex|The problem looked complex, but the diagram helped us understand each step.|그 문제는 복잡해 보였지만 도표 덕분에 각 단계를 이해할 수 있었습니다.
confident|After several rehearsals, he felt confident enough to give the speech.|여러 차례 연습한 뒤 그는 자신 있게 연설할 수 있었습니다.
creative|The students found a creative way to reuse the boxes from the delivery.|학생들은 배달 상자를 재사용할 창의적인 방법을 찾아냈습니다.
current|The current schedule lists the bus times for weekdays and weekends.|현재 시간표에는 평일과 주말의 버스 시간이 나와 있습니다.
effective|The new study plan was effective because it included regular review sessions.|새 학습 계획은 정기적인 복습 시간을 포함해 효과적이었습니다.
essential|Clean water is essential for the health of people, animals, and plants.|깨끗한 물은 사람과 동물, 식물의 건강에 필수적입니다.
excellent|Her excellent notes helped the whole group prepare for the history test.|그녀가 정리한 훌륭한 노트 덕분에 모둠 전체가 역사 시험을 준비할 수 있었습니다.
global|The class discussed how global warming affects weather in different regions.|반 학생들은 지구 온난화가 여러 지역의 날씨에 미치는 영향을 토론했습니다.
individual|Each individual learner can choose a reading pace that feels comfortable.|학습자 각자는 자신에게 편한 독서 속도를 선택할 수 있습니다.
likely|Dark clouds make it likely that we will need to move the game indoors.|먹구름을 보니 경기를 실내로 옮겨야 할 가능성이 큽니다.
major|The new bridge is a major improvement for people traveling between the towns.|새 다리는 두 마을 사이를 이동하는 사람들에게 큰 개선입니다.
modern|The modern library has quiet study rooms and a small recording booth.|현대식 도서관에는 조용한 학습실과 작은 녹음 부스가 있습니다.
natural|The park uses natural materials to build paths that blend into the forest.|공원은 숲과 어우러지는 산책로를 만들 때 천연 재료를 사용합니다.
ordinary|An ordinary walk home became memorable when we saw a family of foxes.|평범한 귀갓길 산책은 여우 가족을 본 뒤 기억에 남는 일이 되었습니다.
personal|Keep personal information private when you post photos online.|온라인에 사진을 올릴 때 개인정보를 비공개로 유지하세요.
physical|Regular physical activity can improve sleep and lower stress.|규칙적인 신체 활동은 수면을 개선하고 스트레스를 줄일 수 있습니다.
positive|The teacher gave positive feedback that helped him revise his essay.|선생님은 그가 글을 고치는 데 도움이 되는 긍정적인 조언을 해 주셨습니다.
practical|The guide gave practical advice for packing light on a weeklong trip.|안내서는 일주일 여행에서 짐을 가볍게 꾸리는 실용적인 조언을 제공했습니다.
private|The counselor offered a private room where students could talk freely.|상담 선생님은 학생들이 편하게 이야기할 수 있는 개인 상담실을 제공했습니다.
recent|A recent report shows that more families are using the new bike path.|최근 보고서에 따르면 더 많은 가족이 새 자전거 도로를 이용하고 있습니다.
serious|The serious injury kept the player off the field for several weeks.|심각한 부상 때문에 그 선수는 몇 주 동안 경기에 나서지 못했습니다.
similar|The two recipes are similar, but one uses yogurt instead of cream.|두 조리법은 비슷하지만 하나는 크림 대신 요구르트를 사용합니다.
specific|Please give a specific example to support your opinion in the essay.|글에서 의견을 뒷받침할 구체적인 예를 들어 주세요.
successful|The successful fundraiser paid for new books in the school library.|성공적인 모금 행사로 학교 도서관에 새 책을 마련할 수 있었습니다.
traditional|The family served a traditional meal made from recipes passed down for generations.|그 가족은 여러 세대에 걸쳐 전해진 조리법으로 전통 음식을 차렸습니다.
valuable|The experience was valuable because it taught us how to work as a team.|팀으로 일하는 법을 배웠기에 그 경험은 값졌습니다.
`;

  const curatedExamples = new Map();
  [curatedExampleData, additionalCuratedExampleData, advancedCuratedExampleData].forEach(function (data) {
    data.trim().split(/\n/).forEach(function (line) {
      const fields = line.split("|");
      if (fields.length === 3) curatedExamples.set(fields[0], { example: fields[1], exampleKo: fields[2] });
    });
  });

  const extraVocabulary = window.JINI_EXTRA_VOCABULARY || {};
  Object.keys(extraVocabulary).forEach(function (level) {
    Object.keys(extraVocabulary[level]).forEach(function (partOfSpeech) {
      if (!raw[level]) throw new Error("Unknown vocabulary level: " + level);
      if (!examples[partOfSpeech]) throw new Error("Unknown part of speech: " + partOfSpeech);
      raw[level][partOfSpeech] = (raw[level][partOfSpeech] || "") + "\n" + extraVocabulary[level][partOfSpeech];
    });
  });

  const result = [];
  let exampleIndex = 0;
  Object.keys(raw).forEach(function (level) {
    Object.keys(raw[level]).forEach(function (partOfSpeech) {
      raw[level][partOfSpeech].trim().split(/\n/).forEach(function (line) {
        const fields = line.trim().split("|");
        if (fields.length !== 3) return;
        const curatedExample = curatedExamples.get(fields[0]);
        const example = curatedExample ? curatedExample.example : examples[partOfSpeech](fields[0], exampleIndex, level);
        let exampleKo;
        if (curatedExample) {
          exampleKo = curatedExample.exampleKo;
        } else if (partOfSpeech === "noun") {
          exampleKo = nounExampleTranslations[fields[0]];
          if (!exampleKo) {
            const meaning = primaryMeaning(fields[2]);
            const templates = levelNounKoreanTemplates[level] || nounKoreanTemplates;
            exampleKo = templates[exampleIndex % templates.length]
              .replace(/\{obj\}/g, meaning + koreanParticle(meaning))
              .replace(/\{subj\}/g, meaning + koreanSubjectParticle(meaning))
              .replace(/\{meaning\}/g, meaning);
          }
        } else if (partOfSpeech === "verb") {
          const forms = verbForms(fields[2]);
          const templates = levelVerbKoreanTemplates[level] || verbKoreanTemplates;
          exampleKo = verbExampleTranslations[fields[0]] || templates[exampleIndex % templates.length]
            .replace(/\{infinitive\}/g, forms.infinitive)
            .replace(/\{future\}/g, forms.future)
            .replace(/\{gerund\}/g, forms.gerund)
            .replace(/\{necessity\}/g, forms.necessity)
            .replace(/\{promise\}/g, forms.promise);
        } else {
          const meaning = primaryMeaning(fields[2]);
          const templates = levelAdjectiveKoreanTemplates[level] || adjectiveKoreanTemplates;
          exampleKo = templates[exampleIndex % templates.length]
            .replace(/\{word\}/g, fields[0])
            .replace(/\{meaning\}/g, meaning);
        }
        exampleIndex += 1;
        result.push({
          level: level,
          word: fields[0],
          ipa: "/" + fields[1] + "/",
          meaning: fields[2],
          example: example,
          exampleKo: exampleKo
        });
      });
    });
  });

  const alternateSenses = {
    apple: [{ meaning: "애플(회사명)", example: "Apple makes computers and phones." }],
    book: [{ meaning: "예약하다 (동사)", example: "We booked a table for six." }],
    clean: [{ meaning: "청소하다 (동사)", example: "We clean our classroom after art class." }],
    bed: [{ meaning: "바닥, 하상", example: "The boat rested on the riverbed." }],
    board: [{ meaning: "탑승하다 (동사)", example: "Passengers boarded the train at noon." }],
    box: [{ meaning: "권투하다 (동사)", example: "The two athletes boxed for three rounds." }],
    ball: [{ meaning: "무도회", example: "They danced together at the school ball." }],
    call: [{ meaning: "전화하다, 부르다", example: "I'll call you after the meeting." }],
    change: [{ meaning: "잔돈, 거스름돈", example: "Keep the change, please." }],
    close: [{ meaning: "가까운 (형용사)", example: "The station is close to my house." }],
    cool: [{ meaning: "멋진, 근사한", example: "Your new jacket looks cool." }],
    country: [{ meaning: "시골, 전원", example: "They moved to the country last year." }],
    date: [{ meaning: "데이트하다 (동사)", example: "They have been dating for a year." }],
    deal: [{ meaning: "거래, 합의", example: "We made a deal with the local store." }],
    grow: [{ meaning: "기르다, 재배하다", example: "My grandparents grow tomatoes in their garden." }],
    hand: [{ meaning: "건네주다 (동사)", example: "Please hand me the blue notebook." }, { meaning: "시곗바늘", example: "The minute hand points to the twelve." }],
    home: [{ meaning: "고향, 집으로", example: "We went home before it got dark." }],
    house: [{ meaning: "수용하다, 담다 (동사)", example: "The building houses a small art collection." }],
    face: [{ meaning: "마주하다, 직면하다 (동사)", example: "We must face the problem together." }],
    fair: [{ meaning: "박람회, 축제", example: "Our school held a science fair." }],
    fast: [{ meaning: "단식하다 (동사)", example: "He fasted before the medical test." }],
    field: [{ meaning: "분야, 전공", example: "She works in the field of medicine." }],
    figure: [{ meaning: "수치, 숫자", example: "The latest sales figures are encouraging." }],
    fine: [{ meaning: "벌금, 과태료", example: "Drivers may pay a fine for parking here." }],
    fly: [{ meaning: "날다, 비행기로 가다 (동사)", example: "We flew to Chicago last summer." }],
    foot: [{ meaning: "피트 (길이 단위)", example: "The room is ten feet wide." }],
    hard: [{ meaning: "열심히 (부사)", example: "She studied hard for the exam." }],
    head: [{ meaning: "이끌다, 향하다 (동사)", example: "Mina will head the new project." }],
    kind: [{ meaning: "종류, 유형", example: "What kind of music do you enjoy?" }],
    last: [{ meaning: "지속하다 (동사)", example: "The meeting lasted for an hour." }],
    left: [{ meaning: "떠났다 (leave의 과거형)", example: "They left before the rain began." }],
    letter: [{ meaning: "문자, 글자", example: "The word 'cat' begins with the letter C." }, { meaning: "편지", example: "I received a letter from my cousin." }],
    light: [{ meaning: "빛, 조명", example: "Please turn on the light." }, { meaning: "가벼운", example: "This bag is light enough to carry." }],
    like: [{ meaning: "~처럼, ~와 같이 (전치사)", example: "Her voice sounds like her mother's." }],
    line: [{ meaning: "줄을 서다 (동사)", example: "We lined up outside the theater." }],
    mean: [{ meaning: "의미하다", example: "What does this sign mean?" }, { meaning: "심술궂은, 못된", example: "It was mean to laugh at his mistake." }],
    match: [{ meaning: "성냥", example: "He lit the candle with a match." }, { meaning: "어울리다, 일치하다 (동사)", example: "These shoes match your jacket." }],
    matter: [{ meaning: "문제, 일", example: "We discussed an important matter at school." }, { meaning: "중요하다 (동사)", example: "Your opinion matters to our team." }],
    minute: [{ meaning: "아주 작은", example: "A minute detail changed the whole design." }],
    miss: [{ meaning: "그리워하다", example: "I miss my friends during the summer break." }, { meaning: "놓치다", example: "Hurry, or you will miss the bus." }],
    once: [{ meaning: "한때, 예전에", example: "This building was once a small library." }],
    order: [{ meaning: "주문하다 (동사)", example: "We ordered soup and salad for lunch." }, { meaning: "순서, 질서", example: "Please put the cards in alphabetical order." }],
    patient: [{ meaning: "환자 (명사)", example: "The doctor spoke kindly to each patient." }],
    park: [{ meaning: "주차하다 (동사)", example: "You can park your car behind the building." }],
    part: [{ meaning: "참여하다 (동사)", example: "Everyone can take part in the school play." }],
    play: [{ meaning: "악기를 연주하다", example: "She plays the piano after dinner." }, { meaning: "연극", example: "Our class is putting on a play next week." }],
    plant: [{ meaning: "공장, 시설", example: "The new plant makes electric cars." }, { meaning: "심다 (동사)", example: "We planted flowers along the path." }],
    point: [{ meaning: "요점, 핵심", example: "He made an important point during the discussion." }],
    present: [{ meaning: "선물 (명사)", example: "I wrapped a present for my sister." }, { meaning: "제시하다, 발표하다 (동사)", example: "He will present his idea to the class." }, { meaning: "현재의", example: "Please describe the present situation." }],
    right: [{ meaning: "오른쪽, 오른편", example: "Turn right at the next street." }, { meaning: "옳은, 정답인", example: "You chose the right answer." }],
    ring: [{ meaning: "전화하다 (동사)", example: "I'll ring you when I get home." }],
    rock: [{ meaning: "흔들다 (동사)", example: "The wind rocked the boat gently." }],
    round: [{ meaning: "한 차례, 회전", example: "The runners completed one round of the track." }],
    run: [{ meaning: "운영하다, 경영하다", example: "Her parents run a small bakery downtown." }, { meaning: "작동하다", example: "The old computer still runs well." }],
    save: [{ meaning: "저축하다", example: "She saves a little money every month." }],
    second: [{ meaning: "초 (시간 단위)", example: "The race was decided by one second." }],
    sentence: [{ meaning: "선고하다 (동사)", example: "The judge sentenced him to community service." }],
    school: [{ meaning: "학파, 유파", example: "He studied the works of the Impressionist school." }],
    sound: [{ meaning: "소리, 음향", example: "We heard a strange sound outside." }, { meaning: "건전한, 건강한", example: "They made a sound decision after careful thought." }],
    space: [{ meaning: "우주", example: "Astronauts conduct research in space." }],
    spring: [{ meaning: "튀어 오르다 (동사)", example: "The cat sprang onto the chair." }, { meaning: "샘, 온천", example: "A clear spring flows near the village." }],
    story: [{ meaning: "층 (건물의)", example: "Their office is on the fifth story of the building." }],
    stand: [{ meaning: "견디다, 참다 (동사)", example: "I can't stand the noise in this room." }],
    state: [{ meaning: "주, 미국의 주", example: "Texas is a large state in the United States." }, { meaning: "말하다, 진술하다 (동사)", example: "Please state your name clearly." }],
    store: [{ meaning: "저장하다 (동사)", example: "This device stores thousands of photos." }],
    table: [{ meaning: "표, 도표", example: "The table shows how much rain fell each month." }, { meaning: "상정 보류하다 (동사)", example: "The committee decided to table the proposal." }],
    train: [{ meaning: "훈련하다 (동사)", example: "They train every morning before school." }],
    watch: [{ meaning: "보다, 지켜보다 (동사)", example: "We watched the birds from the window." }],
    wave: [{ meaning: "손을 흔들다 (동사)", example: "She waved goodbye from the train." }],
    well: [{ meaning: "우물 (명사)", example: "The villagers get water from a deep well." }],
    work: [{ meaning: "작동하다, 기능하다", example: "The lights work perfectly after the repair." }],
    word: [{ meaning: "약속", example: "You have my word that I will help." }],
    number: [{ meaning: "번호를 매기다 (동사)", example: "Please number each page of your report." }],
    answer: [{ meaning: "대답하다 (동사)", example: "She answered every question clearly." }],
    open: [{ meaning: "열려 있는 (형용사)", example: "The library is open until eight tonight." }],
    practice: [{ meaning: "연습하다 (동사)", example: "He practices the guitar every afternoon." }],
    safe: [{ meaning: "금고 (명사)", example: "The documents are locked in the office safe." }],
    short: [{ meaning: "부족한", example: "We are short of time, so let's begin." }],
    time: [{ meaning: "시간을 재다 (동사)", example: "Can you time my run with a stopwatch?" }]
  };
  result.forEach(function (item) {
    item.otherSenses = (alternateSenses[item.word] || []).map(function (sense) {
      return {
        meaning: sense.meaning,
        example: sense.example,
        exampleKo: alternateExampleTranslations[sense.example] || "“" + sense.meaning + "”라는 뜻으로 쓰인 예문입니다."
      };
    });
  });
  window.WORDS = result;
}());
