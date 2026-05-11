export interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "周末独处时，你更偏向？",
    options: [
      { value: "A", label: "躺着不动，纯纯放空" },
      { value: "B", label: "时而emo时而亢奋，反复横跳" },
      { value: "C", label: "找人聊天、刷社交软件、看热闹" },
      { value: "D", label: "清醒发呆，思考人生但啥也不干" },
      { value: "E", label: "脑补剧情、胡思乱想、发呆出神" },
      { value: "F", label: "随便乱来，想吃就吃想睡就睡" },
    ],
  },
  {
    id: 2,
    text: "面对别人麻烦你的请求？",
    options: [
      { value: "A", label: "不好意思拒绝，默默迁就" },
      { value: "B", label: "表面答应，内心烦躁纠结" },
      { value: "C", label: "礼貌圆滑，不得罪任何人" },
      { value: "D", label: "内心冷漠，看心情决定" },
      { value: "E", label: "犹豫纠结，容易想太多" },
      { value: "F", label: "随性拒绝，不想装好人" },
    ],
  },
  {
    id: 3,
    text: "你的拖延程度属于？",
    options: [
      { value: "A", label: "能拖就拖，佛系无所谓" },
      { value: "B", label: "一边焦虑一边拖延" },
      { value: "C", label: "人前高效率，人后拖延" },
      { value: "D", label: "清醒知道该做，但就是不动" },
      { value: "E", label: "走神发呆，思绪乱飞忘记做事" },
      { value: "F", label: "摆烂到底，拖延毫无愧疚感" },
    ],
  },
  {
    id: 4,
    text: "深夜凌晨的你通常？",
    options: [
      { value: "A", label: "安静发呆，情绪平淡" },
      { value: "B", label: "突然难过，情绪爆炸" },
      { value: "C", label: "深夜网抑云、翻看社交软件" },
      { value: "D", label: "清醒通透，看透一切" },
      { value: "E", label: "脑洞爆发，胡思乱想" },
      { value: "F", label: "熬夜乱玩，毫无作息" },
    ],
  },
  {
    id: 5,
    text: "面对人群社交？",
    options: [
      { value: "A", label: "温和随和，安静透明" },
      { value: "B", label: "状态不稳定，时而社牛时而社恐" },
      { value: "C", label: "擅长客套，演技满分" },
      { value: "D", label: "省电模式，尽量少说话" },
      { value: "E", label: "被动慢热，很难融入群体" },
      { value: "F", label: "随性发疯，不在乎别人眼光" },
    ],
  },
  {
    id: 6,
    text: "遇到烦心事你的反应？",
    options: [
      { value: "A", label: "顺其自然，慢慢淡化" },
      { value: "B", label: "反复内耗，情绪拉扯" },
      { value: "C", label: "假装没事，藏住情绪" },
      { value: "D", label: "冷静看淡，懒得纠结" },
      { value: "E", label: "独自消化，默默emo" },
      { value: "F", label: "直接摆烂，爱咋咋地" },
    ],
  },
  {
    id: 7,
    text: "别人对你的第一印象？",
    options: [
      { value: "A", label: "温柔安静、很好说话" },
      { value: "B", label: "捉摸不透、性格奇怪" },
      { value: "C", label: "情商很高、圆滑懂事" },
      { value: "D", label: "冷淡疏离、不好接近" },
      { value: "E", label: "腼腆内向、气质独特" },
      { value: "F", label: "随性散漫、不太正经" },
    ],
  },
  {
    id: 8,
    text: "你最贴合哪种精神状态？",
    options: [
      { value: "A", label: "低欲望、无波澜、佛系存活" },
      { value: "B", label: "矛盾分裂、反复无常" },
      { value: "C", label: "表面热闹、内心孤独" },
      { value: "D", label: "人间清醒、懒得努力" },
      { value: "E", label: "敏感浪漫、精神内耗" },
      { value: "F", label: "自由发疯、快乐至上" },
    ],
  },
];
