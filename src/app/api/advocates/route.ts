import db from "../../../db";
import { advocates } from '@/db/schema';
import { sql, or, ilike, gte, SQL } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Pagination parameters
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  const offset = (page - 1) * limit;

  // Filter parameters
  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const degree = searchParams.get('degree') || '';
  const specialty = searchParams.get('specialty') || '';
  const minYears = searchParams.get('minYears');

  // Build WHERE clause
  const conditions: SQL[] = [];

  if (search) {
    conditions.push(
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`),
        sql`${advocates.specialties}::text ILIKE ${'%' + search + '%'}`
      )!
    );
  }

  if (city) {
    conditions.push(ilike(advocates.city, `%${city}%`));
  }

  if (degree) {
    conditions.push(ilike(advocates.degree, `%${degree}%`));
  }

  if (specialty) {
    conditions.push(sql`${advocates.specialties}::text ILIKE ${'%' + specialty + '%'}`);
  }

  if (minYears) {
    const minYearsNum = parseInt(minYears);
    if (!isNaN(minYearsNum)) {
      conditions.push(gte(advocates.yearsOfExperience, minYearsNum));
    }
  }

  // Build query with conditions
  const whereClause = conditions.length > 0
    ? sql`${sql.join(conditions, sql` AND `)}`
    : undefined;

  // Execute query with pagination
  const data = await db
    .select()
    .from(advocates)
    .where(whereClause)
    .limit(limit)
    .offset(offset);

  // Get total count for pagination
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(advocates)
    .where(whereClause);

  const total = countResult[0]?.count || 0;
  const totalPages = Math.ceil(total / limit);

  return Response.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages
    }
  });
}
