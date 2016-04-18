// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  //[RECEIVE_NATIONAL_DATA]: (state, action) => {{}}   
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {"45540":"The Villages, FL","20700":"East Stroudsburg, PA","10820":"Columbus, IN","19300":"Daphne-Fairhope-Foley, AL","39100": "Poughkeepsie-Newburgh-Middletown, NY", "37700": "Pascagoula, MS", "11300": "Anderson, IN", "14060": "Bloomington-Normal, IL", "29140": "Lafayette, IN", "37380": "Palm Coast, FL", "11340": "Anderson, SC", "26100": "Holland-Grand Haven, MI", "26180": "Honolulu, HI", "31080": "Los Angeles-Long Beach-Santa Ana, CA", "42060": "Santa Barbara-Santa Maria-Goleta, CA", "10180":"Abilene, TX","10420":"Akron, OH","10500":"Albany, GA","10580":"Albany-Schenectady-Troy, NY","10740":"Albuquerque, NM","10780":"Alexandria, LA","10900":"Allentown-Bethlehem-Easton, PA-NJ","11020":"Altoona, PA","11100":"Amarillo, TX","11180":"Ames, IA","11260":"Anchorage, AK","11460":"Ann Arbor, MI","11500":"Anniston-Oxford-Jacksonville, AL","11540":"Appleton, WI","11700":"Asheville, NC","12020":"Athens-Clarke County, GA","12060":"Atlanta-Sandy Springs-Roswell, GA","12100":"Atlantic City-Hammonton, NJ","12220":"Auburn-Opelika, AL","12260":"Augusta-Richmond County, GA-SC","12420":"Austin-Round Rock, TX","12540":"Bakersfield, CA","12580":"Baltimore-Columbia-Towson, MD","12620":"Bangor, ME","12700":"Barnstable Town, MA","12940":"Baton Rouge, LA","12980":"Battle Creek, MI","13020":"Bay City, MI","13140":"Beaumont-Port Arthur, TX","13380":"Bellingham, WA","13460":"Bend-Redmond, OR","13740":"Billings, MT","13780":"Binghamton, NY","13820":"Birmingham-Hoover, AL","13900":"Bismarck, ND","13980":"Blacksburg-Christiansburg-Radford, VA","14020":"Bloomington, IN","14260":"Boise City, ID","14460":"Boston-Cambridge-Newton, MA-NH","14500":"Boulder, CO","14540":"Bowling Green, KY","14740":"Bremerton-Silverdale, WA","14860":"Bridgeport-Stamford-Norwalk, CT","15180":"Brownsville-Harlingen, TX","15260":"Brunswick, GA","15380":"Buffalo-Cheektowaga-Niagara Falls, NY","15500":"Burlington, NC","15540":"Burlington-South Burlington, VT","15940":"Canton-Massillon, OH","15980":"Cape Coral-Fort Myers, FL","16020":"Cape Girardeau, MO-IL","16180":"Carson City, NV","16220":"Casper, WY","16300":"Cedar Rapids, IA","16580":"Champaign-Urbana, IL","16620":"Charleston, WV","16700":"Charleston-North Charleston, SC","16740":"Charlotte-Concord-Gastonia, NC-SC","16820":"Charlottesville, VA","16860":"Chattanooga, TN-GA","16940":"Cheyenne, WY","16980":"Chicago-Naperville-Elgin, IL-IN-WI","17020":"Chico, CA","17140":"Cincinnati, OH-KY-IN","17300":"Clarksville, TN-KY","17420":"Cleveland, TN","17460":"Cleveland-Elyria, OH","17660":"Coeur d'Alene, ID","17780":"College Station-Bryan, TX","17820":"Colorado Springs, CO","17860":"Columbia, MO","17900":"Columbia, SC","17980":"Columbus, GA-AL","18020":"Columbus, IN","18140":"Columbus, OH","18580":"Corpus Christi, TX","18700":"Corvallis, OR","18880":"Crestview-Fort Walton Beach-Destin, FL","19060":"Cumberland, MD-WV","19100":"Dallas-Fort Worth-Arlington, TX","19140":"Dalton, GA","19180":"Danville, IL","19260":"Danville, VA","19340":"Davenport-Moline-Rock Island, IA-IL","19380":"Dayton, OH","19460":"Decatur, AL","19500":"Decatur, IL","19660":"Deltona-Daytona Beach-Ormond Beach, FL","19740":"Denver-Aurora-Lakewood, CO","19780":"Des Moines-West Des Moines, IA","19820":"Detroit-Warren-Dearborn, MI","20020":"Dothan, AL","20100":"Dover, DE","20220":"Dubuque, IA","20260":"Duluth, MN-WI","20500":"Durham-Chapel Hill, NC","20740":"Eau Claire, WI","20940":"El Centro, CA","21060":"Elizabethtown-Fort Knox, KY","21140":"Elkhart-Goshen, IN","21300":"Elmira, NY","21340":"El Paso, TX","21500":"Erie, PA","21660":"Eugene, OR","21780":"Evansville, IN-KY","21820":"Fairbanks, AK","22020":"Fargo, ND-MN","22140":"Farmington, NM","22180":"Fayetteville, NC","22220":"Fayetteville-Springdale-Rogers, AR-MO","22380":"Flagstaff, AZ","22420":"Flint, MI","22500":"Florence, SC","22520":"Florence-Muscle Shoals, AL","22540":"Fond du Lac, WI","22660":"Fort Collins, CO","22900":"Fort Smith, AR-OK","23060":"Fort Wayne, IN","23420":"Fresno, CA","23460":"Gadsden, AL","23540":"Gainesville, FL","23580":"Gainesville, GA","24020":"Glens Falls, NY","24140":"Goldsboro, NC","24220":"Grand Forks, ND-MN","24300":"Grand Junction, CO","24340":"Grand Rapids-Wyoming, MI","24500":"Great Falls, MT","24540":"Greeley, CO","24580":"Green Bay, WI","24660":"Greensboro-High Point, NC","24780":"Greenville, NC","24860":"Greenville-Anderson-Mauldin, SC","25060":"Gulfport-Biloxi-Pascagoula, MS","25180":"Hagerstown-Martinsburg, MD-WV","25260":"Hanford-Corcoran, CA","25420":"Harrisburg-Carlisle, PA","25500":"Harrisonburg, VA","25540":"Hartford-West Hartford-East Hartford, CT","25620":"Hattiesburg, MS","25860":"Hickory-Lenoir-Morganton, NC","25980":"Hinesville, GA","26300":"Hot Springs, AR","26380":"Houma-Thibodaux, LA","26420":"Houston-The Woodlands-Sugar Land, TX","26580":"Huntington-Ashland, WV-KY-OH","26620":"Huntsville, AL","26820":"Idaho Falls, ID","26900":"Indianapolis-Carmel-Anderson, IN","26980":"Iowa City, IA","27060":"Ithaca, NY","27100":"Jackson, MI","27140":"Jackson, MS","27180":"Jackson, TN","27260":"Jacksonville, FL","27340":"Jacksonville, NC","27500":"Janesville-Beloit, WI","27620":"Jefferson City, MO","27740":"Johnson City, TN","27780":"Johnstown, PA","27860":"Jonesboro, AR","27900":"Joplin, MO","28020":"Kalamazoo-Portage, MI","28100":"Kankakee, IL","28140":"Kansas City, MO-KS","28420":"Kennewick-Richland, WA","28660":"Killeen-Temple, TX","28700":"Kingsport-Bristol-Bristol, TN-VA","28740":"Kingston, NY","28940":"Knoxville, TN","29020":"Kokomo, IN","29100":"La Crosse-Onalaska, WI-MN","29180":"Lafayette, LA","29340":"Lake Charles, LA","29420":"Lake Havasu City-Kingman, AZ","29460":"Lakeland-Winter Haven, FL","29540":"Lancaster, PA","29620":"Lansing-East Lansing, MI","29700":"Laredo, TX","29740":"Las Cruces, NM","29820":"Las Vegas-Henderson-Paradise, NV","29940":"Lawrence, KS","30020":"Lawton, OK","30140":"Lebanon, PA","30300":"Lewiston, ID-WA","30340":"Lewiston-Auburn, ME","30460":"Lexington-Fayette, KY","30620":"Lima, OH","30700":"Lincoln, NE","30780":"Little Rock-North Little Rock-Conway, AR","30860":"Logan, UT-ID","30980":"Longview, TX","31020":"Longview, WA","31140":"Louisville/Jefferson County, KY-IN","31180":"Lubbock, TX","31340":"Lynchburg, VA","31420":"Macon, GA","31460":"Madera, CA","31540":"Madison, WI","31700":"Manchester-Nashua, NH","31740":"Manhattan, KS","31860":"Mankato-North Mankato, MN","31900":"Mansfield, OH","32580":"McAllen-Edinburg-Mission, TX","32780":"Medford, OR","32820":"Memphis, TN-MS-AR","32900":"Merced, CA","33100":"Miami-Fort Lauderdale-West Palm Beach, FL","33140":"Michigan City-La Porte, IN","33260":"Midland, TX","33340":"Milwaukee-Waukesha-West Allis, WI","33460":"Minneapolis-St. Paul-Bloomington, MN-WI","33540":"Missoula, MT","33660":"Mobile, AL","33700":"Modesto, CA","33740":"Monroe, LA","33780":"Monroe, MI","33860":"Montgomery, AL","34060":"Morgantown, WV","34100":"Morristown, TN","34580":"Mount Vernon-Anacortes, WA","34620":"Muncie, IN","34740":"Muskegon, MI","34820":"Myrtle Beach-Conway-North Myrtle Beach, SC-NC","34900":"Napa, CA","34940":"Naples-Immokalee-Marco Island, FL","34980":"Nashville-Davidson--Murfreesboro--Franklin, TN","35300":"New Haven-Milford, CT","35380":"New Orleans-Metairie, LA","35620":"New York-Newark-Jersey City, NY-NJ-PA","35660":"Niles-Benton Harbor, MI","35840":"North Port-Sarasota-Bradenton, FL","35980":"Norwich-New London, CT","36100":"Ocala, FL","36140":"Ocean City, NJ","36220":"Odessa, TX","36260":"Ogden-Clearfield, UT","36420":"Oklahoma City, OK","36500":"Olympia-Tumwater, WA","36540":"Omaha-Council Bluffs, NE-IA","36740":"Orlando-Kissimmee-Sanford, FL","36780":"Oshkosh-Neenah, WI","36980":"Owensboro, KY","37100":"Oxnard-Thousand Oaks-Ventura, CA","37340":"Palm Bay-Melbourne-Titusville, FL","37460":"Panama City, FL","37620":"Parkersburg-Vienna, WV","37860":"Pensacola-Ferry Pass-Brent, FL","37900":"Peoria, IL","37980":"Philadelphia-Camden-Wilmington, PA-NJ-DE-MD","38060":"Phoenix-Mesa-Scottsdale, AZ","38220":"Pine Bluff, AR","38300":"Pittsburgh, PA","38340":"Pittsfield, MA","38540":"Pocatello, ID","38860":"Portland-South Portland, ME","38900":"Portland-Vancouver-Hillsboro, OR-WA","38940":"Port St. Lucie, FL","39140":"Prescott, AZ","39300":"Providence-Warwick, RI-MA","39340":"Provo-Orem, UT","39380":"Pueblo, CO","39460":"Punta Gorda, FL","39540":"Racine, WI","39580":"Raleigh, NC","39660":"Rapid City, SD","39740":"Reading, PA","39820":"Redding, CA","39900":"Reno, NV","40060":"Richmond, VA","40140":"Riverside-San Bernardino-Ontario, CA","40220":"Roanoke, VA","40340":"Rochester, MN","40380":"Rochester, NY","40420":"Rockford, IL","40580":"Rocky Mount, NC","40660":"Rome, GA","40900":"Sacramento--Roseville--Arden-Arcade, CA","40980":"Saginaw, MI","41060":"St. Cloud, MN","41100":"St. George, UT","41140":"St. Joseph, MO-KS","41180":"St. Louis, MO-IL","41420":"Salem, OR","41500":"Salinas, CA","41540":"Salisbury, MD-DE","41620":"Salt Lake City, UT","41660":"San Angelo, TX","41700":"San Antonio-New Braunfels, TX","41740":"San Diego-Carlsbad, CA","41780":"Sandusky, OH","41860":"San Francisco-Oakland-Hayward, CA","41940":"San Jose-Sunnyvale-Santa Clara, CA","42020":"San Luis Obispo-Paso Robles-Arroyo Grande, CA","42100":"Santa Cruz-Watsonville, CA","42140":"Santa Fe, NM","42220":"Santa Rosa, CA","42340":"Savannah, GA","42540":"Scranton--Wilkes-Barre--Hazleton, PA","42660":"Seattle-Tacoma-Bellevue, WA","42680":"Sebastian-Vero Beach, FL","43100":"Sheboygan, WI","43300":"Sherman-Denison, TX","43340":"Shreveport-Bossier City, LA","43580":"Sioux City, IA-NE-SD","43620":"Sioux Falls, SD","43780":"South Bend-Mishawaka, IN-MI","43900":"Spartanburg, SC","44060":"Spokane-Spokane Valley, WA","44100":"Springfield, IL","44140":"Springfield, MA","44180":"Springfield, MO","44220":"Springfield, OH","44300":"State College, PA","44700":"Stockton-Lodi, CA","44940":"Sumter, SC","45060":"Syracuse, NY","45220":"Tallahassee, FL","45300":"Tampa-St. Petersburg-Clearwater, FL","45460":"Terre Haute, IN","45500":"Texarkana, TX-AR","45780":"Toledo, OH","45820":"Topeka, KS","45940":"Trenton, NJ","46060":"Tucson, AZ","46140":"Tulsa, OK","46220":"Tuscaloosa, AL","46340":"Tyler, TX","46540":"Utica-Rome, NY","46660":"Valdosta, GA","46700":"Vallejo-Fairfield, CA","47020":"Victoria, TX","47220":"Vineland-Bridgeton, NJ","47260":"Virginia Beach-Norfolk-Newport News, VA-NC","47300":"Visalia-Porterville, CA","47380":"Waco, TX","47580":"Warner Robins, GA","47900":"Washington-Arlington-Alexandria, DC-VA-MD-WV","47940":"Waterloo-Cedar Falls, IA","48140":"Wausau, WI","48300":"Wenatchee, WA","48540":"Wheeling, WV-OH","48620":"Wichita, KS","48660":"Wichita Falls, TX","48700":"Williamsport, PA","48900":"Wilmington, NC","49020":"Winchester, VA-WV","49180":"Winston-Salem, NC","49340":"Worcester, MA-CT","49420":"Yakima, WA","49620":"York-Hanover, PA","49660":"Youngstown-Warren-Boardman, OH-PA","49700":"Yuba City, CA","49740":"Yuma, AZ"}
export default function msaLookupReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
