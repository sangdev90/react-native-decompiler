/**
  React Native Decompiler
  Copyright (C) 2020 Richard Fu and contributors

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Visitor } from '@babel/traverse';
import { isNumericLiteral, booleanLiteral } from '@babel/types';
import { Plugin } from '../../plugin';

/**
 * Converts `!1` and `!0`  to `false` and `true` respectively
 */
export default class LongBooleans extends Plugin {
  readonly pass = 1;

  getVisitor(): Visitor {
    return {
      UnaryExpression(path) {
        const node = path.node;
        if (node.operator !== '!' || !isNumericLiteral(node.argument) || (node.argument.value !== 0 && node.argument.value !== 1)) return;
        path.replaceWith(booleanLiteral(!node.argument.value));
      },
    };
  }
}
