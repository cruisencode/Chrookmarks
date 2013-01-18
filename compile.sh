# This file is part of Chrookmarks.
#
# Copyright (c) 2013, James Nuzzi
#
# Chrookmarks is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Chrookmarks is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Chrookmarks.  If not, see <http://www.gnu.org/licenses/>.

cd build

shopt -s extglob
rm -rf !(.gitignore)

cd ../chrome

cp -af * ../build

cd ../popup

sencha app build

cd ../options

sencha app build

cd ..
