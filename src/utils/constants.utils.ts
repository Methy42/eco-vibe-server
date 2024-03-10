import * as crypto from 'crypto';
import * as path from 'path';

export const jwtConstants = {
    secret: crypto.randomBytes(64),
};

export const effectIconPath = path.join(process.cwd(), 'public', 'effect-icon');
export const skillIconPath = path.join(process.cwd(), 'public', 'skill-icon');
export const characterAvatarPath = path.join(process.cwd(), 'public', 'character-avatar');
export const characterIllustrationPath = path.join(process.cwd(), 'public', 'character-illustration');