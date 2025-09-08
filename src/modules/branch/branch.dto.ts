import { 
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsNumber,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class BranchDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Display name must be between 1 and 100 characters' })
  displayName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50, { message: 'Code must be between 1 and 50 characters' })
  @Matches(/^[A-Za-z0-9_-]+$/, { message: 'Code can only contain letters, numbers, underscores, and hyphens' })
  code: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(#(?:[0-9a-fA-F]{3}){1,2}|(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen))$/i,
    { message: 'Color must be a valid hex (e.g. #F44336) or color name (e.g. red)' }
  )
  @Length(1, 255)
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'morningWorking must be at least 0' })
  @Max(6, { message: 'morningWorking must be at most 6' })
  morningWorking: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningStartAt must be in hh:mm or hh:mm:ss format'
  })
  morningStartAt: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'morningEndAt must be in hh:mm or hh:mm:ss format'
  })
  morningEndAt: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'afternoonWorking must be at least 0' })
  @Max(6, { message: 'afternoonWorking must be at most 6' })
  afternoonWorking: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonStartAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonStartAt: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'afternoonEndAt must be in hh:mm or hh:mm:ss format'
  })
  afternoonEndAt: string;
}